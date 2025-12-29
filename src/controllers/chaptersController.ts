import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getChaptersBySubject = async (req: AuthRequest, res: Response): Promise<void> => {
  const { subjectId } = req.params;

  const result = await query(
    `SELECT id, subject_id, name, description, "order", created_at, updated_at 
     FROM chapters 
     WHERE subject_id = $1
     ORDER BY "order" ASC, name ASC`,
    [subjectId]
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getChapterById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    `SELECT id, subject_id, name, description, "order", created_at, updated_at 
     FROM chapters 
     WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Chapter not found', 404);
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const createChapter = async (req: AuthRequest, res: Response): Promise<void> => {
  const { subjectId } = req.params;
  const { name, description, order } = req.body;

  const subjectExists = await query('SELECT id FROM subjects WHERE id = $1', [subjectId]);
  if (subjectExists.rows.length === 0) {
    throw new AppError('Subject not found', 404);
  }

  const result = await query(
    `INSERT INTO chapters (subject_id, name, description, "order") 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, subject_id, name, description, "order", created_at, updated_at`,
    [subjectId, name, description, order || 0]
  );

  res.status(201).json({
    success: true,
    message: 'Chapter created successfully',
    data: result.rows[0],
  });
};

export const updateChapter = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, order } = req.body;

  const result = await query(
    `UPDATE chapters 
     SET name = COALESCE($1, name),
         description = COALESCE($2, description),
         "order" = COALESCE($3, "order")
     WHERE id = $4
     RETURNING id, subject_id, name, description, "order", created_at, updated_at`,
    [name, description, order, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Chapter not found', 404);
  }

  res.json({
    success: true,
    message: 'Chapter updated successfully',
    data: result.rows[0],
  });
};

export const deleteChapter = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query('DELETE FROM chapters WHERE id = $1 RETURNING id', [id]);

  if (result.rows.length === 0) {
    throw new AppError('Chapter not found', 404);
  }

  res.json({
    success: true,
    message: 'Chapter deleted successfully',
  });
};
