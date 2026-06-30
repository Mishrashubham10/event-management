import { DashboardSell } from '@/components/layout/DashboardSell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardSell>{children}</DashboardSell>;
}