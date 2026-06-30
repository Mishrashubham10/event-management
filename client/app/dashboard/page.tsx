import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentEvents from '@/components/dashboard/RecentEvents';
import QuickActions from '@/components/dashboard/QuickActions';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentEvents />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}