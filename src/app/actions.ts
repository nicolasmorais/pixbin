'use server';

import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob';
import type { PutBlobResult } from '@vercel/blob';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export async function uploadImage(prevState: any, formData: FormData): Promise<{
  message: string;
  error?: string;
  blob?: PutBlobResult;
}> {
  const file = formData.get('image') as File;

  if (!file || file.size === 0) {
    return { message: "No file selected.", error: "Please select an image to upload." };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { message: `Invalid file type. Only ${ACCEPTED_IMAGE_TYPES.join(', ')} are allowed.`, error: "Invalid file type." };
  }
  
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { message: `File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`, error: "File too large." };
  }

  try {
    const blob = await put(file.name, file, {
      access: 'public',
    });

    revalidatePath('/');

    return { message: 'Image uploaded successfully!', blob };
  } catch (error) {
    console.error('Upload error:', error);
    return { message: 'An unexpected error occurred.', error: 'Upload failed.' };
  }
}
