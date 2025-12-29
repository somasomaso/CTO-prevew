import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getAllSubjects = async (req: AuthRequest, res: Response): Promise<void> => {
  const result = await query(
    `SELECT id, name, description, icon, created_at, updated_at 
     FROM subjects 
     ORDER BY name ASC`
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getSubjectById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    'SELECT id, name, description, icon, created_at, updated_at FROM subjects WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Subject not found', 404);
  }

  res.json({
    success: true,
    data: result.rows[0],
  });
};

export const createSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, description, icon } = req.body;

  const result = await query(
    `INSERT INTO subjects (name, description, icon) 
     VALUES ($1, $2, $3) 
     RETURNING id, name, description, icon, created_at, updated_at`,
    [name, description, icon]
  );

  res.status(201).json({
    success: true,
    message: 'Subject created successfully',
    data: result.rows[0],
  });
};

export const updateSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, icon } = req.body;

  const result = await query(
    `UPDATE subjects 
     SET name = COALESCE($1, name),
         description = COALESCE($2, description),
         icon = COALESCE($3, icon)
     WHERE id = $4
     RETURNING id, name, description, icon, created_at, updated_at`,
    [name, description, icon, id]
  );

  if (result.rows.length === 0) {
    throw new AppError('Subject not found', 404);
  }

  res.json({
    success: true,
    message: 'Subject updated successfully',
    data: result.rows[0],
  });
};

export const deleteSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query('DELETE FROM subjects WHERE id = $1 RETURNING id', [id]);

  if (result.rows.length === 0) {
    throw new AppError('Subject not found', 404);
  }

  res.json({
    success: true,
    message: 'Subject deleted successfully',
  });
};
