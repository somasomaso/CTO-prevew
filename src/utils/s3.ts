import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client, { S3_BUCKET_NAME } from '../config/s3';
import crypto from 'crypto';

export const uploadFileToS3 = async (
  file: Express.Multer.File,
  folder: string = 'modules'
): Promise<{ key: string; url: string; hash: string }> => {
  const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
  const fileName = `${folder}/${Date.now()}-${fileHash.substring(0, 16)}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    Metadata: {
      originalName: file.originalname,
      uploadedAt: new Date().toISOString(),
    },
  });

  await s3Client.send(command);

  return {
    key: fileName,
    url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
    hash: fileHash,
  };
};

export const generatePresignedUrl = async (
  key: string,
  expiresIn: number = 3600
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn });
  return url;
};

export const deleteFileFromS3 = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
};

export const validateHtmlFile = (file: Express.Multer.File): { valid: boolean; error?: string } => {
  const maxSize = parseInt(process.env.MAX_FILE_SIZE || '10485760');

  if (file.mimetype !== 'text/html') {
    return { valid: false, error: 'Only HTML files are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: `File size exceeds maximum allowed size of ${maxSize / 1024 / 1024}MB` };
  }

  const content = file.buffer.toString('utf-8');
  if (!content.includes('<html') && !content.includes('<HTML')) {
    return { valid: false, error: 'File does not appear to be valid HTML' };
  }

  return { valid: true };
};
