import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout title="Event Portal" description="Sign in to continue">
      <LoginForm />
    </AuthLayout>
  );
}