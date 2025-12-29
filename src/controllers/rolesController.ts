import { Response } from 'express';
import { query } from '../config/database';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const getAllRoles = async (req: AuthRequest, res: Response): Promise<void> => {
  const result = await query(
    `SELECT r.id, r.name, r.description, r.level, r.created_at,
            COUNT(DISTINCT ur.user_id) as user_count,
            COUNT(DISTINCT rp.permission_id) as permission_count
     FROM roles r
     LEFT JOIN user_roles ur ON r.id = ur.role_id
     LEFT JOIN role_permissions rp ON r.id = rp.role_id
     GROUP BY r.id
     ORDER BY r.level ASC`
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getRoleById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const roleResult = await query(
    'SELECT id, name, description, level, created_at FROM roles WHERE id = $1',
    [id]
  );

  if (roleResult.rows.length === 0) {
    throw new AppError('Role not found', 404);
  }

  const permissionsResult = await query(
    `SELECT p.id, p.name, p.description, p.resource, p.action
     FROM permissions p
     INNER JOIN role_permissions rp ON p.id = rp.permission_id
     WHERE rp.role_id = $1`,
    [id]
  );

  res.json({
    success: true,
    data: {
      ...roleResult.rows[0],
      permissions: permissionsResult.rows,
    },
  });
};

export const getAllPermissions = async (req: AuthRequest, res: Response): Promise<void> => {
  const result = await query(
    `SELECT id, name, description, resource, action, created_at
     FROM permissions
     ORDER BY resource ASC, action ASC`
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getRoleUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const result = await query(
    `SELECT u.id, u.username, u.email, ur.assigned_at, ur.expires_at,
            assignedBy.username as assigned_by_username
     FROM users u
     INNER JOIN user_roles ur ON u.id = ur.user_id
     LEFT JOIN users assignedBy ON ur.assigned_by = assignedBy.id
     WHERE ur.role_id = $1
     ORDER BY ur.assigned_at DESC`,
    [id]
  );

  res.json({
    success: true,
    data: result.rows,
  });
};

export const getRoleChangeLogs = async (req: AuthRequest, res: Response): Promise<void> => {
  const { page = 1, limit = 50 } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  const result = await query(
    `SELECT rcl.id, rcl.user_id, rcl.role_id, rcl.action, rcl.reason, rcl.created_at,
            u.username, r.name as role_name,
            changedBy.username as changed_by_username
     FROM role_change_logs rcl
     INNER JOIN users u ON rcl.user_id = u.id
     INNER JOIN roles r ON rcl.role_id = r.id
     INNER JOIN users changedBy ON rcl.changed_by = changedBy.id
     ORDER BY rcl.created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );

  const countResult = await query('SELECT COUNT(*) as total FROM role_change_logs');
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
