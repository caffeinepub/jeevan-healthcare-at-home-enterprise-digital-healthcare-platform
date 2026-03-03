import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDoctorEarnings } from '../../hooks/useQueries';

export default function DoctorEarningsPage() {
  const { data: earnings, isLoading, error } = useDoctorEarnings();

  const totalEarnings = earnings?.reduce((sum, earning) => sum + earning.amount, 0) || 0;
  const pendingPayments = earnings?.filter(e => e.paymentStatus === 'pending').length || 0;

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load earnings data. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-jeevan-text">Payments & Earnings</h1>
            <p className="mt-2 text-gray-600">Track your consultation fees and payments</p>
          </div>
          <Button className="bg-jeevan-primary hover:bg-jeevan-teal">
            <Download className="mr-2 h-5 w-5" />
            Export Statement
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Total Earnings
                <DollarSign className="h-5 w-5 text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">₹{totalEarnings.toLocaleString()}</p>
              )}
              <p className="mt-1 text-sm text-gray-600">All time</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                Pending Payments
                <TrendingUp className="h-5 w-5 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">{pendingPayments}</p>
              )}
              <p className="mt-1 text-sm text-gray-600">Awaiting payment</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-jeevan-primary">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-600">
                This Month
                <Calendar className="h-5 w-5 text-jeevan-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-32" />
              ) : (
                <p className="text-3xl font-bold text-jeevan-text">₹45,200</p>
              )}
              <p className="mt-1 text-sm text-green-600">+12% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Details */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl text-jeevan-text">Earnings History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <Skeleton className="h-16 w-full" />
                    </div>
                  ))
                ) : earnings && earnings.length > 0 ? (
                  earnings.map((earning) => (
                    <div
                      key={Number(earning.earningId)}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-jeevan-text">
                          Appointment #{Number(earning.appointmentId)}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(Number(earning.date) / 1000000).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-jeevan-text">₹{earning.amount.toLocaleString()}</p>
                        <span
                          className={`text-xs ${
                            earning.paymentStatus === 'paid'
                              ? 'text-green-600'
                              : earning.paymentStatus === 'pending'
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {earning.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600">No earnings records available</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="paid">
                <div className="p-12 text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600">No paid transactions</p>
                </div>
              </TabsContent>

              <TabsContent value="pending">
                <div className="p-12 text-center">
                  <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600">No pending payments</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
