import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getSubchaptersByChapter = async (req: AuthRequest, res: Response): Promise<void> => {
  const { chapterId } = req.params;

  const result = await query(
    `SELECT id, chapter_id, name, description, "order", created_at, updated_at 
     FROM subchapters 
     WHERE chapter_id = $1
     ORDER BY "order" ASC, name ASC`,
    [chapterId]
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getSubchapterById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    `SELECT id, chapter_id, name, description, "order", created_at, updated_at 
     FROM subchapters 
     WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Subchapter not found', 404);
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const createSubchapter = async (req: AuthRequest, res: Response): Promise<void> => {
  const { chapterId } = req.params;
  const { name, description, order } = req.body;

  const chapterExists = await query('SELECT id FROM chapters WHERE id = $1', [chapterId]);
  if (chapterExists.rows.length === 0) {
    throw new AppError('Chapter not found', 404);
  }

  const result = await query(
    `INSERT INTO subchapters (chapter_id, name, description, "order") 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, chapter_id, name, description, "order", created_at, updated_at`,
    [chapterId, name, description, order || 0]
  );

  res.status(201).json({
    success: true,
    message: 'Subchapter created successfully',
    data: result.rows[0],
  });
};

export const updateSubchapter = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, order } = req.body;

  const result = await query(
    `UPDATE subchapters 
     SET name = COALESCE($1, name),
         description = COALESCE($2, description),
         "order" = COALESCE($3, "order")
     WHERE id = $4
     RETURNING id, chapter_id, name, description, "order", created_at, updated_at`,
    [name, description, order, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Subchapter not found', 404);
  }

  res.json({
    success: true,
    message: 'Subchapter updated successfully',
    data: result.rows[0],
  });
};

export const deleteSubchapter = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query('DELETE FROM subchapters WHERE id = $1 RETURNING id', [id]);

  if (result.rows.length === 0) {
    throw new AppError('Subchapter not found', 404);
  }

  res.json({
    success: true,
    message: 'Subchapter deleted successfully',
  });
};
