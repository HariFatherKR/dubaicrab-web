import { randomBytes } from 'crypto';

/**
 * Generate a new API key in the format: dcrab_XXXXXXXXXXXX
 * Uses cryptographically secure random bytes
 */
export function generateApiKey(): string {
  const bytes = randomBytes(18); // 18 bytes = 24 base64 chars
  const key = bytes.toString('base64url').substring(0, 24);
  return `dcrab_${key}`;
}

/**
 * Generate a 6-digit connection code
 */
export function generateConnectionCode(): string {
  const bytes = randomBytes(3);
  const num = bytes.readUIntBE(0, 3) % 1000000;
  return num.toString().padStart(6, '0');
}

/**
 * Validate API key format
 */
export function isValidApiKeyFormat(key: string): boolean {
  return /^dcrab_[A-Za-z0-9_-]{24}$/.test(key);
}
