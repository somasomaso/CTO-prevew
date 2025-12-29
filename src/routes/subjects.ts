import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from '../controllers/subjectsController';
import { authenticate } from '../middleware/auth';
import { requirePermission } from '../middleware/rbac';
import { validate } from '../middleware/validation';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', asyncHandler(getAllSubjects));

router.get('/:id', asyncHandler(getSubjectById));

router.post(
  '/',
  authenticate,
  requirePermission('subjects:create'),
  validate([
    body('name').notEmpty().isLength({ max: 200 }).withMessage('Name is required and must be max 200 characters'),
    body('description').optional().isString(),
    body('icon').optional().isString().isLength({ max: 100 }),
  ]),
  asyncHandler(createSubject)
);

router.put(
  '/:id',
  authenticate,
  requirePermission('subjects:update'),
  validate([
    body('name').optional().isLength({ max: 200 }),
    body('description').optional().isString(),
    body('icon').optional().isString().isLength({ max: 100 }),
  ]),
  asyncHandler(updateSubject)
);

router.delete(
  '/:id',
  authenticate,
  requirePermission('subjects:delete'),
  asyncHandler(deleteSubject)
);

export default router;
