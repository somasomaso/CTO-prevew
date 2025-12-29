import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';
import { uploadFileToS3, generatePresignedUrl, deleteFileFromS3, validateHtmlFile } from '../utils/s3';

export const getModulesBySubchapter = async (req: AuthRequest, res: Response): Promise<void> => {
  const { subchapterId } = req.params;
  const userRoles = req.user?.roles || [];

  let statusFilter = "status = 'approved'";
  if (userRoles.includes('admin') || userRoles.includes('moderator')) {
    statusFilter = "status IN ('approved', 'pending', 'rejected', 'hidden')";
  } else if (userRoles.includes('contributor') && req.user) {
    statusFilter = `(status = 'approved' OR (uploaded_by = '${req.user.userId}'))`;
  }

  const result = await query(
    `SELECT m.id, m.subchapter_id, m.name, m.description, m."order", 
            m.content_type, m.file_size, m.status, m.uploaded_by,
            m.created_at, m.updated_at, u.username as uploader_username
     FROM modules m
     LEFT JOIN users u ON m.uploaded_by = u.id
     WHERE m.subchapter_id = $1 AND ${statusFilter}
     ORDER BY m."order" ASC, m.name ASC`,
    [subchapterId]
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getModuleById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    `SELECT m.id, m.subchapter_id, m.name, m.description, m."order", 
            m.content_type, m.file_path, m.file_size, m.file_hash,
            m.status, m.uploaded_by, m.reviewed_by, m.reviewed_at,
            m.created_at, m.updated_at,
            u.username as uploader_username,
            r.username as reviewer_username
     FROM modules m
     LEFT JOIN users u ON m.uploaded_by = u.id
     LEFT JOIN users r ON m.reviewed_by = r.id
     WHERE m.id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Module not found', 404);
  }

  const module = result.rows[0];
  const userRoles = req.user?.roles || [];

  if (module.status !== 'approved' && !userRoles.includes('admin') && !userRoles.includes('moderator')) {
    if (module.uploaded_by !== req.user?.userId) {
      throw new AppError('Access denied', 403);
    }
  }

  res.json({
    success: true,
    data: module,
  });
};

export const getModuleDownloadUrl = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    'SELECT file_path, status, uploaded_by FROM modules WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Module not found', 404);
  }

  const module = result.rows[0];

  if (!module.file_path) {
    throw new AppError('Module has no file', 404);
  }

  const userRoles = req.user?.roles || [];
  if (module.status !== 'approved' && !userRoles.includes('admin') && !userRoles.includes('moderator')) {
    if (module.uploaded_by !== req.user?.userId) {
      throw new AppError('Access denied', 403);
    }
  }

  const downloadUrl = await generatePresignedUrl(module.file_path);

  res.json({
    success: true,
    data: { downloadUrl },
  });
};

export const uploadModule = async (req: AuthRequest, res: Response): Promise<void> => {
  const { subchapterId } = req.params;
  const { name, description, order } = req.body;
  const file = req.file;

  if (!file) {
    throw new AppError('No file provided', 400);
  }

  const validation = validateHtmlFile(file);
  if (!validation.valid) {
    throw new AppError(validation.error || 'Invalid file', 400);
  }

  const subchapterExists = await query('SELECT id FROM subchapters WHERE id = $1', [subchapterId]);
  if (subchapterExists.rows.length === 0) {
    throw new AppError('Subchapter not found', 404);
  }

  const s3Result = await uploadFileToS3(file, 'modules');

  const result = await query(
    `INSERT INTO modules (subchapter_id, name, description, "order", content_type, 
                          file_path, file_size, file_hash, uploaded_by, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
     RETURNING id, subchapter_id, name, description, "order", content_type, 
               file_size, status, uploaded_by, created_at, updated_at`,
    [
      subchapterId,
      name,
      description,
      order || 0,
      file.mimetype,
      s3Result.key,
      file.size,
      s3Result.hash,
      req.user!.userId,
      'pending',
    ]
  );

  await query(
    `INSERT INTO upload_logs (user_id, module_id, action, status, ip_address) 
     VALUES ($1, $2, $3, $4, $5)`,
    [req.user!.userId, result.rows[0].id, 'upload', 'success', req.ip]
  );

  res.status(201).json({
    success: true,
    message: 'Module uploaded successfully and pending approval',
    data: result.rows[0],
  });
};

export const updateModule = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, order } = req.body;

  const existing = await query('SELECT uploaded_by FROM modules WHERE id = $1', [id]);
  if (existing.rows.length === 0) {
    throw new AppError('Module not found', 404);
  }

  const isOwner = existing.rows[0].uploaded_by === req.user!.userId;
  const isAdmin = req.user!.roles.includes('admin');

  if (!isOwner && !isAdmin) {
    throw new AppError('Access denied. You can only update your own modules', 403);
  }

  const result = await query(
    `UPDATE modules 
     SET name = COALESCE($1, name),
         description = COALESCE($2, description),
         "order" = COALESCE($3, "order")
     WHERE id = $4
     RETURNING id, subchapter_id, name, description, "order", content_type, 
               file_size, status, uploaded_by, created_at, updated_at`,
    [name, description, order, id]
  );

  res.json({
    success: true,
    message: 'Module updated successfully',
    data: result.rows[0],
  });
};

export const deleteModule = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const existing = await query(
    'SELECT uploaded_by, file_path FROM modules WHERE id = $1',
    [id]
  );

  if (existing.rows.length === 0) {
    throw new AppError('Module not found', 404);
  }

  const isOwner = existing.rows[0].uploaded_by === req.user!.userId;
  const canDeleteAny = req.user!.permissions.includes('modules:delete-any');

  if (!isOwner && !canDeleteAny) {
    throw new AppError('Access denied', 403);
  }

  if (existing.rows[0].file_path) {
    try {
      await deleteFileFromS3(existing.rows[0].file_path);
    } catch (error) {
      console.error('Error deleting file from S3:', error);
    }
  }

  await query('DELETE FROM modules WHERE id = $1', [id]);

  await query(
    `INSERT INTO upload_logs (user_id, module_id, action, status, ip_address) 
     VALUES ($1, $2, $3, $4, $5)`,
    [req.user!.userId, id, 'delete', 'success', req.ip]
  );

  res.json({
    success: true,
    message: 'Module deleted successfully',
  });
};

export const approveModule = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    `UPDATE modules 
     SET status = 'approved', reviewed_by = $1, reviewed_at = NOW()
     WHERE id = $2
     RETURNING id, name, status`,
    [req.user!.userId, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Module not found', 404);
  }

  await query(
    `INSERT INTO upload_logs (user_id, module_id, action, status, ip_address) 
     VALUES ($1, $2, $3, $4, $5)`,
    [req.user!.userId, id, 'approve', 'success', req.ip]
  );

  res.json({
    success: true,
    message: 'Module approved successfully',
    data: result.rows[0],
  });
};

export const rejectModule = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { reason } = req.body;

  const result = await query(
    `UPDATE modules 
     SET status = 'rejected', reviewed_by = $1, reviewed_at = NOW()
     WHERE id = $2
     RETURNING id, name, status`,
    [req.user!.userId, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Module not found', 404);
  }

  await query(
    `INSERT INTO upload_logs (user_id, module_id, action, status, details, ip_address) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [req.user!.userId, id, 'reject', 'success', JSON.stringify({ reason }), req.ip]
  );

  res.json({
    success: true,
    message: 'Module rejected successfully',
    data: result.rows[0],
  });
};

export const hideModule = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    `UPDATE modules 
     SET status = 'hidden', reviewed_by = $1, reviewed_at = NOW()
     WHERE id = $2
     RETURNING id, name, status`,
    [req.user!.userId, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Module not found', 404);
  }

  res.json({
    success: true,
    message: 'Module hidden successfully',
    data: result.rows[0],
  });
};
