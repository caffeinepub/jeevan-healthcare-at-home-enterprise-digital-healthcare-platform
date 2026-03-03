import { useEffect } from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, TestTube, Package, FileText, Users, Home, Loader2, Heart, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin, useHasLabExecutiveCapabilities } from '../../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: hasLabExecCapabilities, isLoading: labExecLoading } = useHasLabExecutiveCapabilities();

  const isAuthenticated = !!identity;
  const isLoading = profileLoading || adminLoading || labExecLoading;
  const hasAccess = isAdmin || hasLabExecCapabilities;

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate({ to: '/' });
    } else if (isAuthenticated && !isLoading && !hasAccess) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, isLoading, hasAccess, navigate]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' as const },
    { icon: TestTube, label: 'Tests & Packages', path: '/admin/tests' as const },
    { icon: Package, label: 'Orders', path: '/admin/orders' as const },
    { icon: FileText, label: 'Reports', path: '/admin/reports' as const },
    { icon: Users, label: 'Users', path: '/admin/users' as const },
    { icon: Heart, label: 'Customers', path: '/admin/customers' as const },
    { icon: Users, label: 'Patients', path: '/admin/patients' as const },
    { icon: Activity, label: 'Vitals', path: '/admin/vitals' as const },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-jeevan-primary" />
            <p className="mt-4 text-gray-600">Verifying access...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated || !hasAccess) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <div className="flex h-20 items-center border-b px-6">
          <img src="/assets/Jeevan HealthCare Logo.jpeg" alt="Jeevan" className="h-12 w-auto" />
        </div>

        <nav className="space-y-1 p-4">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate({ to: item.path })}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          ))}
          <Button 
            variant="ghost" 
            className="w-full justify-start text-jeevan-primary" 
            onClick={() => navigate({ to: '/' })}
          >
            <Home className="mr-3 h-5 w-5" />
            Back to Home
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
