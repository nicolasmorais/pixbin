'use server';

import { revalidatePath } from 'next/cache';
import { put, del } from '@vercel/blob';
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
    return { message: "Nenhum arquivo selecionado.", error: "Por favor, selecione uma imagem para enviar." };
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return { message: `Tipo de arquivo inválido. Apenas ${ACCEPTED_IMAGE_TYPES.join(', ')} são permitidos.`, error: "Tipo de arquivo inválido." };
  }
  
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { message: `Arquivo muito grande. O tamanho máximo é ${MAX_FILE_SIZE_MB}MB.`, error: "Arquivo muito grande." };
  }

  try {
    const blob = await put(file.name, file, {
      access: 'public',
    });

    revalidatePath('/');

    return { message: 'Imagem enviada com sucesso!', blob };
  } catch (error) {
    console.error('Erro no upload:', error);
    return { message: 'Ocorreu um erro inesperado.', error: 'Falha no upload.' };
  }
}


export async function deleteImage(url: string): Promise<{
  message: string;
  error?: string;
}> {
  try {
    await del(url);
    revalidatePath('/');
    return { message: 'Imagem excluída com sucesso!' };
  } catch (error) {
    console.error('Erro ao excluir:', error);
    return { message: 'Ocorreu um erro ao excluir a imagem.', error: 'Falha na exclusão.' };
  }
}