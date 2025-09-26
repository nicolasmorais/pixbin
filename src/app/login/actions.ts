'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/lib/constants';

export async function login(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

  if (password === adminPassword) {
    cookies().set(AUTH_COOKIE_NAME, 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: '/',
    });
    return { success: true, message: null };
  }

  return {
    success: false,
    message: 'Senha inválida.',
  };
}
