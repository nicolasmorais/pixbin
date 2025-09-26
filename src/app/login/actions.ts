'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/constants';

export async function login(prevState: any, formData: FormData): Promise<{ message: string | null }> {
  const password = formData.get('password');
  const adminPassword = 'admin';

  if (password !== adminPassword) {
    return { message: 'Senha inválida.' };
  }

  cookies().set(AUTH_COOKIE_NAME, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    path: '/',
  });

  redirect('/');
}
