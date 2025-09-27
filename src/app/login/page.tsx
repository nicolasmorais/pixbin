import { LoginForm } from '@/components/auth/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm text-center">
            <Image 
              src="https://iv2jb3repd5xzuuy.public.blob.vercel-storage.com/ChatGPT%20Image%2026%20de%20set.%20de%202025%2C%2022_19_04%20%281%29-WRduHS9M8L1lSjQ5AuZGseL9pJDAhl.png" 
              alt="Pixbin Logo" 
              width={80}
              height={80}
              className="mx-auto mb-8"
            />
            <LoginForm />
        </div>
    </main>
  );
}
