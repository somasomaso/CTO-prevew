import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  const { page = 1, limit = 20 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const result = await query(
    `SELECT u.id, u.email, u.username, u.created_at,
            up.bio, up.avatar_url, up.is_verified_contributor,
            ARRAY_AGG(DISTINCT r.name) as roles
     FROM users u
     LEFT JOIN user_profiles up ON u.id = up.user_id
     LEFT JOIN user_roles ur ON u.id = ur.user_id
     LEFT JOIN roles r ON ur.role_id = r.id
     GROUP BY u.id, up.id
     ORDER BY u.created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const countResult = await query('SELECT COUNT(*) as total FROM users');
  const total = parseInt(countResult.rows[0].total);

  res.json({
    success: true,
    data: result.rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    `SELECT u.id, u.email, u.username, u.created_at,
            up.bio, up.avatar_url, up.is_verified_contributor,
            ARRAY_AGG(DISTINCT r.name) as roles
     FROM users u
     LEFT JOIN user_profiles up ON u.id = up.user_id
     LEFT JOIN user_roles ur ON u.id = ur.user_id
     LEFT JOIN roles r ON ur.role_id = r.id
     WHERE u.id = $1
     GROUP BY u.id, up.id`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const updateUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { bio, avatar_url } = req.body;

  const isOwner = id === req.user!.userId;
  const isAdmin = req.user!.roles.includes('admin');

  if (!isOwner && !isAdmin) {
    throw new AppError('Access denied', 403);
  }

  const result = await query(
    `UPDATE user_profiles 
     SET bio = COALESCE($1, bio),
         avatar_url = COALESCE($2, avatar_url)
     WHERE user_id = $3
     RETURNING id, user_id, bio, avatar_url, is_verified_contributor`,
    [bio, avatar_url, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('User profile not found', 404);
  }

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: result.rows[0],
  });
};

export const assignRole = async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId, roleId, expiresAt } = req.body;

  const userExists = await query('SELECT id FROM users WHERE id = $1', [userId]);
  if (userExists.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  const roleExists = await query('SELECT id, name FROM roles WHERE id = $1', [roleId]);
  if (roleExists.rows.length === 0) {
    throw new AppError('Role not found', 404);
  }

  const existing = await query(
    'SELECT id FROM user_roles WHERE user_id = $1 AND role_id = $2',
    [userId, roleId]
  );

  if (existing.rows.length > 0) {
    throw new AppError('User already has this role', 400);
  }

  const result = await query(
    `INSERT INTO user_roles (user_id, role_id, assigned_by, expires_at) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, user_id, role_id, assigned_by, assigned_at, expires_at`,
    [userId, roleId, req.user!.userId, expiresAt || null]
  );

  await query(
    `INSERT INTO role_change_logs (user_id, role_id, action, changed_by) 
     VALUES ($1, $2, $3, $4)`,
    [userId, roleId, 'assigned', req.user!.userId]
  );

  res.status(201).json({
    success: true,
    message: `Role "${roleExists.rows[0].name}" assigned successfully`,
    data: result.rows[0],
  });
};

export const revokeRole = async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId, roleId } = req.body;

  const result = await query(
    'DELETE FROM user_roles WHERE user_id = $1 AND role_id = $2 RETURNING id',
    [userId, roleId]
  );

  if (result.rows.length === 0) {
    throw new AppError('User role assignment not found', 404);
  }

  await query(
    `INSERT INTO role_change_logs (user_id, role_id, action, changed_by) 
     VALUES ($1, $2, $3, $4)`,
    [userId, roleId, 'revoked', req.user!.userId]
  );

  res.json({
    success: true,
    message: 'Role revoked successfully',
  });
};

export const verifyContributor = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    `UPDATE user_profiles 
     SET is_verified_contributor = true
     WHERE user_id = $1
     RETURNING id, user_id, is_verified_contributor`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('User profile not found', 404);
  }

  res.json({
    success: true,
    message: 'Contributor verified successfully',
    data: result.rows[0],
  });
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  if (id === req.user!.userId) {
    throw new AppError('You cannot delete your own account', 400);
  }

  const result = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

  if (result.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  res.json({
    success: true,
    message: 'User deleted successfully',
  });
};
