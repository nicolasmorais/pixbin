'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/app/login/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} className="w-full btn-main transition-colors duration-300">
      {pending ? 'Authenticating...' : 'Enter'}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Login Failed",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="space-y-4">
      <Input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="bg-background border-foreground text-foreground text-center"
      />
      <SubmitButton />
    </form>
  );
}
