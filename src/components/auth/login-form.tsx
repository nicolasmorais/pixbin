'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
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
  const [state, formAction] = useFormState(login, { message: null });
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Falha no Login",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} ref={formRef} className="space-y-4">
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
