import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from '@tanstack/react-router';
import { 
  LayoutDashboard, 
  Calendar, 
  FolderOpen, 
  Stethoscope, 
  DollarSign, 
  BarChart3, 
  User, 
  HelpCircle, 
  Home, 
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useHasDoctorRole } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DoctorLayout() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched: profileFetched } = useGetCallerUserProfile();
  const { data: hasDoctor, isLoading: doctorLoading, isFetched: doctorFetched } = useHasDoctorRole();

  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const isAuthenticated = !!identity;
  const isLoading = profileLoading || doctorLoading;
  const hasAccess = hasDoctor === true;

  useEffect(() => {
    // Wait for all data to be fetched before making decisions
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate({ to: '/' });
      return;
    }

    // Only show access denied if we've confirmed the user doesn't have doctor role
    if (profileFetched && doctorFetched && !hasAccess) {
      setShowAccessDenied(true);
    }
  }, [isAuthenticated, isLoading, hasAccess, profileFetched, doctorFetched, navigate]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor' as const },
    { icon: Calendar, label: 'My Appointments', path: '/doctor/appointments' as const },
    { icon: FolderOpen, label: 'Patient Records', path: '/doctor/patients' as const },
    { icon: Stethoscope, label: 'Consultations', path: '/doctor/consultations' as const },
    { icon: DollarSign, label: 'Payments & Earnings', path: '/doctor/earnings' as const },
    { icon: BarChart3, label: 'Analytics & Feedback', path: '/doctor/analytics' as const },
    { icon: User, label: 'Profile & Settings', path: '/doctor/profile' as const },
    { icon: HelpCircle, label: 'Help & Support', path: '/doctor/help' as const },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-jeevan-primary" />
            <p className="mt-4 text-gray-600">Verifying doctor access...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (showAccessDenied) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-jeevan-primary">
              <AlertCircle className="h-6 w-6" />
              Access Restricted
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Unauthorized Access</AlertTitle>
              <AlertDescription>
                You do not have permission to access the Doctor Dashboard. This area is restricted to users with the doctor role.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                If you believe you should have access to this area, please contact your administrator.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Current Role:</strong> {userProfile?.role || 'Unknown'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => navigate({ to: '/' })}
                className="flex-1 bg-jeevan-primary hover:bg-jeevan-teal"
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!hasAccess) {
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
