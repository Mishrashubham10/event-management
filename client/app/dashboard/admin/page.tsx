import { AdminHero } from '@/components/admin/AdminHero';
import { AdminQuickActions } from '@/components/admin/AdminQuickActions';
import { AdminStats } from '@/components/admin/AdminStats';
import { RecentActivity } from '@/components/admin/RecentActivity';

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <AdminHero />
      <AdminStats />
      <AdminQuickActions />
      <RecentActivity />
    </div>
  );
}