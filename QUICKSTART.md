# Quick Start Guide - Educational Platform Backend

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] PostgreSQL 12+ installed and running
- [ ] AWS account with S3 bucket created
- [ ] Git installed

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/educational_platform

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 3. Create Database

```bash
# Using psql
psql -U postgres

# In psql console
CREATE DATABASE educational_platform;
\q
```

### 4. Build and Run Migrations

```bash
# Build TypeScript
npm run server:build

# Run migrations (creates all tables)
npm run db:migrate
```

Expected output:
```
Starting database migrations...
Database connection successful: { ... }
Executed query { ... }
✓ Database schema created successfully
```

### 5. Seed Database

```bash
npm run db:seed
```

Expected output:
```
Starting database seeding...
✓ Database seeded successfully

Default admin credentials:
  Email: admin@example.com
  Password: Admin123!

⚠️  Please change the default admin password immediately!
```

### 6. Start the Server

**Development mode (with auto-reload):**
```bash
npm run server:dev
```

**Production mode:**
```bash
npm run server:start
```

Expected output:
```
═══════════════════════════════════════════════════════
✓ Server is running on port 5000
✓ Environment: development
✓ API Base URL: http://localhost:5000/api
✓ Health Check: http://localhost:5000/health
═══════════════════════════════════════════════════════
```

## Testing the API

### 1. Health Check

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Login as Admin

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "Admin123!"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "email": "admin@example.com",
      "username": "admin",
      "roles": ["admin"]
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the token!** You'll need it for authenticated requests.

### 3. Test Protected Endpoint

```bash
# Replace YOUR_TOKEN with the token from login response
curl -X GET http://localhost:5000/api/subjects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Create a Subject (Admin Only)

```bash
curl -X POST http://localhost:5000/api/subjects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mathematics",
    "description": "All math topics",
    "icon": "📐"
  }'
```

### 5. Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "testuser",
    "password": "Test123!"
  }'
```

New users are automatically assigned the "viewer" role.

## Common Issues & Solutions

### Issue: Database connection failed

**Solution:**
1. Check PostgreSQL is running: `sudo systemctl status postgresql`
2. Verify DATABASE_URL in `.env`
3. Ensure database exists: `psql -U postgres -l`
4. Check credentials are correct

### Issue: Migration fails with "relation already exists"

**Solution:**
If tables already exist, either:
1. Drop and recreate database:
   ```bash
   psql -U postgres
   DROP DATABASE educational_platform;
   CREATE DATABASE educational_platform;
   \q
   npm run db:migrate
   ```
2. Or skip migration if tables are already created

### Issue: AWS S3 upload fails

**Solution:**
1. Verify AWS credentials in `.env`
2. Ensure S3 bucket exists and is in the correct region
3. Check IAM permissions for S3 operations (PutObject, GetObject, DeleteObject)

### Issue: JWT token invalid or expired

**Solution:**
1. Login again to get a new token
2. Check JWT_SECRET is set in `.env`
3. Verify JWT_EXPIRES_IN is set correctly

### Issue: Port 5000 already in use

**Solution:**
1. Change PORT in `.env` to another port (e.g., 5001)
2. Or kill the process using port 5000:
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

## Role-Based Access

### Available Roles

1. **Viewer** (Default for new users)
   - View approved content
   - Rate and review modules

2. **Contributor**
   - All Viewer permissions
   - Upload modules
   - Manage own modules

3. **Moderator**
   - All Contributor permissions
   - Approve/reject modules
   - Hide modules
   - Moderate users

4. **Admin**
   - All Moderator permissions
   - Manage subjects, chapters, subchapters
   - Assign/revoke roles
   - Delete any content
   - Full system access

### Assigning Roles (Admin Only)

```bash
# Get user ID from /api/users endpoint
# Get role ID from /api/roles endpoint

curl -X POST http://localhost:5000/api/users/roles/assign \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid-here",
    "roleId": "role-uuid-here"
  }'
```

## Module Upload Workflow

### 1. Upload Module (Contributor+)

```bash
curl -X POST http://localhost:5000/api/modules/subchapter/SUBCHAPTER_ID/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@path/to/module.html" \
  -F "name=Introduction to Algebra" \
  -F "description=Basic algebraic concepts" \
  -F "order=1"
```

Module status: `pending`

### 2. Review and Approve (Moderator+)

```bash
# Approve
curl -X POST http://localhost:5000/api/modules/MODULE_ID/approve \
  -H "Authorization: Bearer YOUR_MODERATOR_TOKEN"

# Or reject
curl -X POST http://localhost:5000/api/modules/MODULE_ID/reject \
  -H "Authorization: Bearer YOUR_MODERATOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reason": "Content needs improvement"}'
```

### 3. Download Module

```bash
# Get presigned URL
curl -X GET http://localhost:5000/api/modules/MODULE_ID/download \
  -H "Authorization: Bearer YOUR_TOKEN"

# Returns:
{
  "success": true,
  "data": {
    "downloadUrl": "https://bucket.s3.amazonaws.com/..."
  }
}
```

## API Documentation

For complete API documentation, see [BACKEND_README.md](./BACKEND_README.md)

Key endpoints:
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile
- `GET /api/subjects` - List subjects
- `POST /api/subjects` - Create subject (Admin)
- `GET /api/roles` - List roles
- `POST /api/users/roles/assign` - Assign role (Admin)
- `POST /api/modules/subchapter/:id/upload` - Upload module (Contributor)
- `POST /api/modules/:id/approve` - Approve module (Moderator)

## Next Steps

1. **Change default admin password:**
   - Login as admin
   - Update password through user profile endpoint

2. **Create content hierarchy:**
   - Create subjects
   - Add chapters to subjects
   - Add subchapters to chapters
   - Upload modules to subchapters

3. **Manage users:**
   - Register users or invite them to register
   - Assign appropriate roles
   - Verify contributors

4. **Set up frontend:**
   - Configure FRONTEND_URL in .env
   - Integrate with Next.js frontend
   - Handle JWT tokens in frontend

5. **Deploy to production:**
   - Set NODE_ENV=production
   - Use strong JWT_SECRET
   - Configure production database
   - Set up HTTPS
   - Configure CORS for production domain

## Useful Commands

```bash
# Development
npm run server:dev          # Start dev server with auto-reload
npm run dev                 # Start Next.js frontend

# Build
npm run server:build        # Build backend TypeScript
npm run build               # Build Next.js frontend

# Production
npm run server:start        # Start production backend
npm run start               # Start production frontend

# Database
npm run db:migrate          # Run migrations
npm run db:seed             # Seed database

# Utilities
npm run lint                # Lint code
```

## Security Reminders

- ✅ Change default admin password immediately
- ✅ Use strong JWT_SECRET in production
- ✅ Keep AWS credentials secure
- ✅ Enable HTTPS in production
- ✅ Regularly update dependencies
- ✅ Review and audit role assignments
- ✅ Monitor upload logs for suspicious activity

## Getting Help

- Check [BACKEND_README.md](./BACKEND_README.md) for detailed documentation
- Review [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for architecture overview
- Check logs for error messages
- Verify environment variables are set correctly

## Success! 🎉

Your backend is now ready to:
- Authenticate users with JWT
- Control access with RBAC
- Manage educational content
- Handle file uploads to S3
- Track all activities with audit logs

Ready to integrate with your frontend!
