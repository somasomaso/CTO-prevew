import { Response } from 'express';
import { query } from '../config/database';
import { generateToken } from '../config/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

export const signup = async (req: AuthRequest, res: Response): Promise<void> => {
  const { email, password, username } = req.body;

  const existingUser = await query(
    'SELECT id FROM users WHERE email = $1 OR username = $2',
    [email, username]
  );

  if (existingUser.rows.length > 0) {
    throw new AppError('Email or username already exists', 400);
  }

  const passwordHash = await hashPassword(password);

  const result = await query(
    `INSERT INTO users (email, password_hash, username) 
     VALUES ($1, $2, $3) 
     RETURNING id, email, username, created_at`,
    [email, passwordHash, username]
  );

  const user = result.rows[0];

  await query(
    'INSERT INTO user_profiles (user_id) VALUES ($1)',
    [user.id]
  );

  const viewerRole = await query(
    'SELECT id FROM roles WHERE name = $1',
    ['viewer']
  );

  if (viewerRole.rows.length > 0) {
    await query(
      'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)',
      [user.id, viewerRole.rows[0].id]
    );
  }

  const userWithRoles = await getUserWithRolesAndPermissions(user.id);

  const token = generateToken({
    userId: userWithRoles.id,
    email: userWithRoles.email,
    username: userWithRoles.username,
    roles: userWithRoles.roles,
    permissions: userWithRoles.permissions,
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        roles: userWithRoles.roles,
      },
      token,
    },
  });
};

export const login = async (req: AuthRequest, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const result = await query(
    'SELECT id, email, username, password_hash FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    throw new AppError('Invalid credentials', 401);
  }

  const user = result.rows[0];
  const isValidPassword = await comparePassword(password, user.password_hash);

  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401);
  }

  const userWithRoles = await getUserWithRolesAndPermissions(user.id);

  const token = generateToken({
    userId: user.id,
    email: user.email,
    username: user.username,
    roles: userWithRoles.roles,
    permissions: userWithRoles.permissions,
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        roles: userWithRoles.roles,
      },
      token,
    },
  });
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    throw new AppError('Authentication required', 401);
  }

  const result = await query(
    `SELECT u.id, u.email, u.username, u.created_at,
            up.bio, up.avatar_url, up.is_verified_contributor
     FROM users u
     LEFT JOIN user_profiles up ON u.id = up.user_id
     WHERE u.id = $1`,
    [req.user.userId]
  );

  if (result.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  const user = result.rows[0];

  res.json({
    success: true,
    data: {
      ...user,
      roles: req.user.roles,
      permissions: req.user.permissions,
    },
  });
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  res.json({
    success: true,
    message: 'Logout successful',
  });
};

const getUserWithRolesAndPermissions = async (userId: string) => {
  const userResult = await query(
    'SELECT id, email, username FROM users WHERE id = $1',
    [userId]
  );

  const user = userResult.rows[0];

  const rolesResult = await query(
    `SELECT r.name, r.level
     FROM roles r
     INNER JOIN user_roles ur ON r.id = ur.role_id
     WHERE ur.user_id = $1 AND (ur.expires_at IS NULL OR ur.expires_at > NOW())`,
    [userId]
  );

  const roles = rolesResult.rows.map((r) => r.name);

  const permissionsResult = await query(
    `SELECT DISTINCT p.name
     FROM permissions p
     INNER JOIN role_permissions rp ON p.id = rp.permission_id
     INNER JOIN user_roles ur ON rp.role_id = ur.role_id
     WHERE ur.user_id = $1 AND (ur.expires_at IS NULL OR ur.expires_at > NOW())`,
    [userId]
  );

  const permissions = permissionsResult.rows.map((p) => p.name);

  return {
    ...user,
    roles,
    permissions,
  };
};
