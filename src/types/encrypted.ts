export type Encrypted = {
  // The actual ciphertext (i.e., encrypted version of your secret string). It's base64-encoded.
  encrypted: string;

  // The Initialization Vector (IV) – a random value used to ensure the same plaintext doesn’t always produce the same ciphertext. It’s essential for security and uniqueness in encryption.
  iv: string;

  // The Authentication Tag – used by AES-GCM to ensure data integrity and authenticity. If someone tampers with the ciphertext, decryption will fail.
  authTag: string;
};
