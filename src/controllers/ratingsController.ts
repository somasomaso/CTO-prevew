import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getRatingsByModule = async (req: AuthRequest, res: Response): Promise<void> => {
  const { moduleId } = req.params;

  const result = await query(
    `SELECT mr.id, mr.module_id, mr.user_id, mr.rating, mr.review, mr.created_at,
            u.username
     FROM module_ratings mr
     INNER JOIN users u ON mr.user_id = u.id
     WHERE mr.module_id = $1
     ORDER BY mr.created_at DESC`,
    [moduleId]
  );

  const avgResult = await query(
    `SELECT AVG(rating)::numeric(10,2) as average_rating, COUNT(*) as total_ratings
     FROM module_ratings
     WHERE module_id = $1`,
    [moduleId]
  );

  res.json({
    success: true,
    data: {
      ratings: result.rows,
      statistics: avgResult.rows[0],
    },
  });
};

export const createRating = async (req: AuthRequest, res: Response): Promise<void> => {
  const { moduleId } = req.params;
  const { rating, review } = req.body;

  if (rating < 1 || rating > 5) {
    throw new AppError('Rating must be between 1 and 5', 400);
  }

  const moduleExists = await query('SELECT id FROM modules WHERE id = $1', [moduleId]);
  if (moduleExists.rows.length === 0) {
    throw new AppError('Module not found', 404);
  }

  const existing = await query(
    'SELECT id FROM module_ratings WHERE module_id = $1 AND user_id = $2',
    [moduleId, req.user!.userId]
  );

  if (existing.rows.length > 0) {
    throw new AppError('You have already rated this module. Use update instead.', 400);
  }

  const result = await query(
    `INSERT INTO module_ratings (module_id, user_id, rating, review) 
     VALUES ($1, $2, $3, $4) 
     RETURNING id, module_id, user_id, rating, review, created_at`,
    [moduleId, req.user!.userId, rating, review]
  );

  res.status(201).json({
    success: true,
    message: 'Rating submitted successfully',
    data: result.rows[0],
  });
};

export const updateRating = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { rating, review } = req.body;

  if (rating && (rating < 1 || rating > 5)) {
    throw new AppError('Rating must be between 1 and 5', 400);
  }

  const existing = await query(
    'SELECT user_id FROM module_ratings WHERE id = $1',
    [id]
  );

  if (existing.rows.length === 0) {
    throw new AppError('Rating not found', 404);
  }

  const isOwner = existing.rows[0].user_id === req.user!.userId;
  const canModerate = req.user!.permissions.includes('ratings:moderate');

  if (!isOwner && !canModerate) {
    throw new AppError('Access denied', 403);
  }

  const result = await query(
    `UPDATE module_ratings 
     SET rating = COALESCE($1, rating),
         review = COALESCE($2, review)
     WHERE id = $3
     RETURNING id, module_id, user_id, rating, review, created_at, updated_at`,
    [rating, review, id]
  );

  res.json({
    success: true,
    message: 'Rating updated successfully',
    data: result.rows[0],
  });
};

export const deleteRating = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const existing = await query(
    'SELECT user_id FROM module_ratings WHERE id = $1',
    [id]
  );

  if (existing.rows.length === 0) {
    throw new AppError('Rating not found', 404);
  }

  const isOwner = existing.rows[0].user_id === req.user!.userId;
  const canModerate = req.user!.permissions.includes('ratings:moderate');

  if (!isOwner && !canModerate) {
    throw new AppError('Access denied', 403);
  }

  await query('DELETE FROM module_ratings WHERE id = $1', [id]);

  res.json({
    success: true,
    message: 'Rating deleted successfully',
  });
};
