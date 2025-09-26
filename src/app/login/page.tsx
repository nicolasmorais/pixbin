import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm text-center">
            <h1 className="text-5xl font-bold mb-8 font-headline">Pixbin</h1>
            <LoginForm />
        </div>
    </main>
  );
}
