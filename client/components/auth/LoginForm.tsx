'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { loginSchema, LoginFormValues } from '@/schemas/auth.schema';

import { useLazyMeQuery, useLoginMutation } from '@/redux/api/authApi';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/auth/authSlice';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { getErrorMessage } from '@/lib/getErrMsg';

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const [getCurrentUser] = useLazyMeQuery();

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      // Login -> backend sets httpOnly cookie
      const loginResponse = await login(values).unwrap();

      toast.success(loginResponse.message);

      // Fetch authenticated user
      const meResponse = await getCurrentUser().unwrap();

      dispatch(setUser(meResponse.data));

      router.replace('/dashboard');
    } catch (error) {
      toast.error(getErrorMessage(error));
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