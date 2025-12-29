-- Seed data for Educational Platform

-- Insert default roles (ordered by level for permission inheritance)
INSERT INTO roles (id, name, description, level) VALUES
    ('00000000-0000-0000-0000-000000000001', 'viewer', 'Can view and rate modules, view content hierarchy', 1),
    ('00000000-0000-0000-0000-000000000002', 'contributor', 'Can upload modules, view analytics on own modules', 2),
    ('00000000-0000-0000-0000-000000000003', 'moderator', 'Can review/approve content, moderate users', 3),
    ('00000000-0000-0000-0000-000000000004', 'admin', 'Full platform access, user and system management', 4)
ON CONFLICT (name) DO NOTHING;

-- Insert permissions for different resources and actions
-- Subject permissions
INSERT INTO permissions (name, description, resource, action) VALUES
    ('subjects:read', 'View subjects', 'subjects', 'read'),
    ('subjects:create', 'Create new subjects', 'subjects', 'create'),
    ('subjects:update', 'Update existing subjects', 'subjects', 'update'),
    ('subjects:delete', 'Delete subjects', 'subjects', 'delete')
ON CONFLICT (resource, action) DO NOTHING;

-- Chapter permissions
INSERT INTO permissions (name, description, resource, action) VALUES
    ('chapters:read', 'View chapters', 'chapters', 'read'),
    ('chapters:create', 'Create new chapters', 'chapters', 'create'),
    ('chapters:update', 'Update existing chapters', 'chapters', 'update'),
    ('chapters:delete', 'Delete chapters', 'chapters', 'delete')
ON CONFLICT (resource, action) DO NOTHING;

-- Subchapter permissions
INSERT INTO permissions (name, description, resource, action) VALUES
    ('subchapters:read', 'View subchapters', 'subchapters', 'read'),
    ('subchapters:create', 'Create new subchapters', 'subchapters', 'create'),
    ('subchapters:update', 'Update existing subchapters', 'subchapters', 'update'),
    ('subchapters:delete', 'Delete subchapters', 'subchapters', 'delete')
ON CONFLICT (resource, action) DO NOTHING;

-- Module permissions
INSERT INTO permissions (name, description, resource, action) VALUES
    ('modules:read', 'View modules', 'modules', 'read'),
    ('modules:create', 'Upload new modules', 'modules', 'create'),
    ('modules:update', 'Update own modules', 'modules', 'update'),
    ('modules:delete', 'Delete own modules', 'modules', 'delete'),
    ('modules:approve', 'Approve/reject modules', 'modules', 'approve'),
    ('modules:moderate', 'Hide/feature modules', 'modules', 'moderate'),
    ('modules:delete-any', 'Delete any module', 'modules', 'delete-any')
ON CONFLICT (resource, action) DO NOTHING;

-- User permissions
INSERT INTO permissions (name, description, resource, action) VALUES
    ('users:read', 'View user profiles', 'users', 'read'),
    ('users:update', 'Update own profile', 'users', 'update'),
    ('users:manage', 'Manage all users', 'users', 'manage'),
    ('users:delete', 'Delete users', 'users', 'delete')
ON CONFLICT (resource, action) DO NOTHING;

-- Role permissions
INSERT INTO permissions (name, description, resource, action) VALUES
    ('roles:read', 'View roles', 'roles', 'read'),
    ('roles:assign', 'Assign roles to users', 'roles', 'assign'),
    ('roles:manage', 'Manage roles and permissions', 'roles', 'manage')
ON CONFLICT (resource, action) DO NOTHING;

-- Rating permissions
INSERT INTO permissions (name, description, resource, action) VALUES
    ('ratings:create', 'Rate and review modules', 'ratings', 'create'),
    ('ratings:update', 'Update own ratings', 'ratings', 'update'),
    ('ratings:delete', 'Delete own ratings', 'ratings', 'delete'),
    ('ratings:moderate', 'Moderate all ratings', 'ratings', 'moderate')
ON CONFLICT (resource, action) DO NOTHING;

-- Assign permissions to Viewer role
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000001', id FROM permissions WHERE name IN (
    'subjects:read',
    'chapters:read',
    'subchapters:read',
    'modules:read',
    'users:read',
    'users:update',
    'ratings:create',
    'ratings:update',
    'ratings:delete'
) ON CONFLICT DO NOTHING;

-- Assign permissions to Contributor role (inherits viewer + upload)
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000002', id FROM permissions WHERE name IN (
    'subjects:read',
    'chapters:read',
    'subchapters:read',
    'modules:read',
    'modules:create',
    'modules:update',
    'modules:delete',
    'users:read',
    'users:update',
    'ratings:create',
    'ratings:update',
    'ratings:delete'
) ON CONFLICT DO NOTHING;

-- Assign permissions to Moderator role (inherits contributor + moderation)
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000003', id FROM permissions WHERE name IN (
    'subjects:read',
    'chapters:read',
    'subchapters:read',
    'modules:read',
    'modules:create',
    'modules:update',
    'modules:delete',
    'modules:approve',
    'modules:moderate',
    'users:read',
    'users:update',
    'users:manage',
    'ratings:create',
    'ratings:update',
    'ratings:delete',
    'ratings:moderate'
) ON CONFLICT DO NOTHING;

-- Assign all permissions to Admin role
INSERT INTO role_permissions (role_id, permission_id)
SELECT '00000000-0000-0000-0000-000000000004', id FROM permissions
ON CONFLICT DO NOTHING;

-- Create initial admin user (password: Admin123!)
-- Password hash generated with bcrypt, rounds=10
INSERT INTO users (id, email, password_hash, username) VALUES
    ('00000000-0000-0000-0000-000000000010', 'admin@example.com', '$2b$10$rKqF/xWJQpVYYLVLz5xH5.kpYXQqXqJ8xH5vKvYvXqJ8xH5vKvYvXO', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Create user profile for admin
INSERT INTO user_profiles (user_id, bio, is_verified_contributor) VALUES
    ('00000000-0000-0000-0000-000000000010', 'System Administrator', true)
ON CONFLICT (user_id) DO NOTHING;

-- Assign admin role to admin user
INSERT INTO user_roles (user_id, role_id, assigned_by) VALUES
    ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000010')
ON CONFLICT (user_id, role_id) DO NOTHING;
