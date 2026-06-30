'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { loginSchema, LoginFormValues } from '@/schemas/auth.schema';

import { useLoginMutation } from '@/redux/api/authApi';
import { useAppDispatch } from '@/redux/hooks';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { setCredential } from '@/redux/auth/authSlice';
import { saveAuth } from '@/lib/auth';

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await login(values).unwrap();

      dispatch(
        setCredential({
          token: response.data.token,
          user: response.data.user,
        }),
      );

      saveAuth(response.data.token, JSON.stringify(response.data.user));

      toast.success(response.message);

      router.push('/dashboard');
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: { message?: string } }).data?.message ===
          'string'
          ? (error as { data?: { message?: string } }).data?.message
          : 'Unable to login.';

      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Username</FieldLabel>

              <FieldContent>
                <Input placeholder="Enter username" {...field} />

                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Password</FieldLabel>

              <FieldContent>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />

                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
}