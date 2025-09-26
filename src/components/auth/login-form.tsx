'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { login } from '@/app/login/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className="w-full btn-main transition-colors duration-300">
      {pending ? 'Autenticando...' : 'Entrar'}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, { message: null, success: false });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/');
    }
    if (state?.message) {
      toast({
        title: "Falha no Login",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);

  return (
    <form action={formAction} className="space-y-4">
      <Input
        type="password"
        name="password"
        placeholder="Senha"
        required
        className="bg-background border-foreground/30 text-foreground text-center"
      />
      <SubmitButton />
    </form>
  );
}
