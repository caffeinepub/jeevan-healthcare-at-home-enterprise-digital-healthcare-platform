import { useEffect } from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, Package, Home, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useHasPhlebotomistRole } from '../../hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';

export default function PhlebotomistLayout() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: hasPhlebotomistRole, isLoading: roleLoading } = useHasPhlebotomistRole();

  const isAuthenticated = !!identity;
  const isLoading = profileLoading || roleLoading;
  const hasAccess = hasPhlebotomistRole;

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate({ to: '/' });
    } else if (isAuthenticated && !isLoading && !hasAccess) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, isLoading, hasAccess, navigate]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/phlebotomist' as const },
    { icon: Package, label: 'My Collections', path: '/phlebotomist/collections' as const },
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
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
