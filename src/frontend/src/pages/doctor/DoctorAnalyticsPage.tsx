import { BarChart3, TrendingUp, Star, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDoctorDashboardStats } from '../../hooks/useQueries';

export default function DoctorAnalyticsPage() {
  const { data: stats, isLoading, error } = useDoctorDashboardStats();

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load analytics data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-jeevan-text">Analytics & Feedback</h1>
          <p className="mt-2 text-gray-600">Track your performance and patient feedback</p>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-jeevan-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Completed Consultations
                <BarChart3 className="h-5 w-5 text-jeevan-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">{stats?.completedConsultations || 0}</p>
              )}
              <p className="mt-1 text-sm text-green-600">+15% this month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Average Rating
                <Star className="h-5 w-5 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">{stats?.rating || 0} ⭐</p>
              )}
              <p className="mt-1 text-sm text-gray-600">Based on patient reviews</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-jeevan-teal">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Total Patients
                <Activity className="h-5 w-5 text-jeevan-teal" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">{stats?.totalPatients || 0}</p>
              )}
              <p className="mt-1 text-sm text-gray-600">Unique patients served</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Success Rate
                <TrendingUp className="h-5 w-5 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-jeevan-text">94%</p>
              <p className="mt-1 text-sm text-gray-600">Patient satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Placeholder */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-xl text-jeevan-text">Consultation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                <div className="text-center text-gray-500">
                  <BarChart3 className="mx-auto h-12 w-12 mb-2" />
                  <p>Chart visualization coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-xl text-jeevan-text">Rating Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                <div className="text-center text-gray-500">
                  <Star className="mx-auto h-12 w-12 mb-2" />
                  <p>Chart visualization coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Feedback */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-jeevan-text">Recent Patient Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-jeevan-text">Ramesh Kumar</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Excellent consultation! Dr. was very thorough and explained everything clearly."
                </p>
                <p className="mt-2 text-xs text-gray-500">2 days ago</p>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-jeevan-text">Lakshmi Devi</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  "Very professional and caring. Would definitely recommend."
                </p>
                <p className="mt-2 text-xs text-gray-500">5 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
