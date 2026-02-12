import { Package, CheckCircle, Clock, MapPin, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSampleCollections } from '../../hooks/useQueries';

export default function PhlebotomistDashboardPage() {
  const { data: collections, isLoading, error } = useSampleCollections();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-jeevan-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-96">
          <CardContent className="py-12 text-center">
            <p className="text-destructive">Failed to load dashboard data</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const todayCollections = collections || [];
  const totalCollections = todayCollections.length;
  const completedCollections = todayCollections.filter((c) => c.status === 'Sample Collected').length;
  const pendingCollections = todayCollections.filter((c) => c.status === 'Assigned').length;
  const inProgressCollections = todayCollections.filter((c) => c.status === 'On Way').length;

  const metrics = [
    {
      title: "Today's Collections",
      value: totalCollections.toString(),
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Completed',
      value: completedCollections.toString(),
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'In Progress',
      value: inProgressCollections.toString(),
      icon: MapPin,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Pending',
      value: pendingCollections.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jeevan-primary">Phlebotomist Dashboard</h1>
        <p className="mt-2 text-gray-600">Your daily collection overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <div className={`rounded-full p-2 ${metric.bgColor}`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
