import { createHash } from 'node:crypto';
import type { ReferenceImage } from '../types';

/** Validate committed bytes before publishing a metadata-linked reference image. */
export function assertReferenceImageAsset(image: ReferenceImage, bytes: Buffer): void {
  if (bytes.length > 5_000_000) throw new Error(`Reference image exceeds 5 MB: ${image.path}`);
  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const isPng = bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'));
  if (!(image.path.endsWith('.jpg') && isJpeg) && !(image.path.endsWith('.png') && isPng)) {
    throw new Error(`Reference image format does not match ${image.path}`);
  }
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (sha256 !== image.sha256) throw new Error(`Reference image checksum differs: ${image.path}`);
}
