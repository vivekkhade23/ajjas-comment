import crypto from 'crypto';

export function hmacSha256(body, secret) {
  return crypto.createHmac('sha256', secret).update(body).digest('hex');
}
