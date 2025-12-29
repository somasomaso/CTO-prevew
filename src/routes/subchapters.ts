import { Router } from 'express';
import { body } from 'express-validator';
import {
  getSubchaptersByChapter,
  getSubchapterById,
  createSubchapter,
  updateSubchapter,
  deleteSubchapter,
} from '../controllers/subchaptersController';
import { authenticate } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { validate } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/chapter/:chapterId', asyncHandler(getSubchaptersByChapter));

router.get('/:id', asyncHandler(getSubchapterById));

router.post(
  '/chapter/:chapterId',
  authenticate,
  requirePermission('subchapters:create'),
  validate([
    body('name').notEmpty().isLength({ max: 200 }).withMessage('Name is required and must be max 200 characters'),
    body('description').optional().isString(),
    body('order').optional().isInt({ min: 0 }),
  ]),
  asyncHandler(createSubchapter)
);

router.put(
  '/:id',
  authenticate,
  requirePermission('subchapters:update'),
  validate([
    body('name').optional().isLength({ max: 200 }),
    body('description').optional().isString(),
    body('order').optional().isInt({ min: 0 }),
  ]),
  asyncHandler(updateSubchapter)
);

router.delete(
  '/:id',
  authenticate,
  requirePermission('subchapters:delete'),
  asyncHandler(deleteSubchapter)
);

export default router;
