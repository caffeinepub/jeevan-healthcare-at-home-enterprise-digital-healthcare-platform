import { Calendar, FileText, DollarSign, Video, FileCheck, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from '@tanstack/react-router';
import { useDoctorDashboardStats, useGetCallerUserProfile } from '../../hooks/useQueries';

export default function DoctorDashboardPage() {
  const navigate = useNavigate();
  const { data: stats, isLoading, error } = useDoctorDashboardStats();
  const { data: userProfile } = useGetCallerUserProfile();

  const doctorName = userProfile?.name || 'Doctor';

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load dashboard data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header with Personalized Welcome */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-jeevan-text">
            Welcome back, Dr. {doctorName}!
          </h1>
          <p className="mt-2 text-gray-600">Here's your overview for today.</p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-jeevan-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Today's Appointments
                <Calendar className="h-5 w-5 text-jeevan-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">{Number(stats?.todayAppointments) || 0}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-jeevan-teal">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Pending Prescriptions
                <FileText className="h-5 w-5 text-jeevan-teal" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">{Number(stats?.pendingPrescriptions) || 0}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Earnings Today
                <DollarSign className="h-5 w-5 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">₹{stats?.earningsToday?.toLocaleString() || 0}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Rating
                <Badge className="bg-yellow-500">{stats?.rating || 0} ⭐</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <p className="text-sm text-gray-600">{Number(stats?.completedConsultations) || 0} consultations</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-jeevan-text">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button
                onClick={() => navigate({ to: '/doctor/consultations' })}
                className="h-auto flex-col items-start gap-2 bg-jeevan-primary p-6 text-left hover:bg-jeevan-teal"
              >
                <Video className="h-6 w-6" />
                <span className="font-semibold">Start Teleconsultation</span>
                <span className="text-xs opacity-90">Begin video/audio consultation</span>
              </Button>

              <Button
                onClick={() => navigate({ to: '/doctor/patients' })}
                className="h-auto flex-col items-start gap-2 bg-jeevan-teal p-6 text-left hover:bg-jeevan-primary"
              >
                <FileCheck className="h-6 w-6" />
                <span className="font-semibold">Review Lab Reports</span>
                <span className="text-xs opacity-90">Check patient test results</span>
              </Button>

              <Button
                onClick={() => navigate({ to: '/doctor/consultations' })}
                className="h-auto flex-col items-start gap-2 bg-gray-700 p-6 text-left hover:bg-gray-800"
              >
                <FileText className="h-6 w-6" />
                <span className="font-semibold">Approve Prescriptions</span>
                <span className="text-xs opacity-90">Review and approve pending</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-xl text-jeevan-text">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-jeevan-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-jeevan-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-jeevan-text">New appointment scheduled</p>
                  <p className="text-sm text-gray-600">Patient: Ramesh Kumar - Today at 3:00 PM</p>
                  <p className="mt-1 text-xs text-gray-500">5 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-jeevan-teal/10 p-2">
                  <FileText className="h-5 w-5 text-jeevan-teal" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-jeevan-text">Lab report available</p>
                  <p className="text-sm text-gray-600">Patient: Lakshmi Devi - Blood Test Results</p>
                  <p className="mt-1 text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-yellow-500/10 p-2">
                  <Bell className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-jeevan-text">Follow-up reminder</p>
                  <p className="text-sm text-gray-600">Patient: Srinivas Rao - Follow-up due tomorrow</p>
                  <p className="mt-1 text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

