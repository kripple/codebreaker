import crypto from 'crypto';

import type { Encrypted } from '@/types/encrypted';

export function decrypt(payload: Encrypted) {
  const key = crypto.createHash('sha256').update('your-secret-key').digest(); // 32 bytes

  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(payload.iv, 'base64'),
  );
  decipher.setAuthTag(Buffer.from(payload.authTag, 'base64'));
  const decrypted = `${decipher.update(payload.encrypted, 'base64', 'utf8')}${decipher.final('utf8')}`;

  return decrypted;
}
