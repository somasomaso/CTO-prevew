import { Router } from 'express';
import { body } from 'express-validator';
import {
  getChaptersBySubject,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter,
} from '../controllers/chaptersController';
import { authenticate } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { validate } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/subject/:subjectId', asyncHandler(getChaptersBySubject));

router.get('/:id', asyncHandler(getChapterById));

router.post(
  '/subject/:subjectId',
  authenticate,
  requirePermission('chapters:create'),
  validate([
    body('name').notEmpty().isLength({ max: 200 }).withMessage('Name is required and must be max 200 characters'),
    body('description').optional().isString(),
    body('order').optional().isInt({ min: 0 }),
  ]),
  asyncHandler(createChapter)
);

router.put(
  '/:id',
  authenticate,
  requirePermission('chapters:update'),
  validate([
    body('name').optional().isLength({ max: 200 }),
    body('description').optional().isString(),
    body('order').optional().isInt({ min: 0 }),
  ]),
  asyncHandler(updateChapter)
);

router.delete(
  '/:id',
  authenticate,
  requirePermission('chapters:delete'),
  asyncHandler(deleteChapter)
);

export default router;
