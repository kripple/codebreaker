import crypto from 'crypto';

export function random() {
  const key = crypto.randomBytes(32); // 256-bit key for AES-256
  return key.toString('base64');
}
