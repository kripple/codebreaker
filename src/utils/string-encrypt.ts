import crypto from 'crypto';

import type { Encrypted } from '@/types/encrypted';

export function encrypt(value: string): Encrypted {
  // Server-only AES key (env var or KMS)
  const key = crypto.createHash('sha256').update('your-secret-key').digest(); // 32 bytes
  const iv = crypto.randomBytes(12); // 96 bits for GCM

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = `${cipher.update(value, 'utf8', 'base64')}${cipher.final('base64')}`;
  const authTag = cipher.getAuthTag().toString('base64');

  const payload = {
    encrypted,
    iv: iv.toString('base64'),
    authTag,
  };

  return payload;
}
