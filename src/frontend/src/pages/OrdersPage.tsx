import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockOrders = [
  {
    id: 'ORD-2025-001',
    date: '2025-01-25',
    status: 'sample_collected',
    tests: ['Complete Blood Count', 'Lipid Profile'],
    amount: 950,
    collectionDate: '2025-01-26',
    collectionTime: '08:00 AM - 10:00 AM',
    phlebotomist: 'Rajesh Kumar',
  },
  {
    id: 'ORD-2025-002',
    date: '2025-01-20',
    status: 'report_ready',
    tests: ['Thyroid Profile', 'HbA1c'],
    amount: 950,
    collectionDate: '2025-01-21',
    reportDate: '2025-01-22',
  },
  {
    id: 'ORD-2025-003',
    date: '2025-01-15',
    status: 'completed',
    tests: ['Basic Health Checkup Package'],
    amount: 1500,
    collectionDate: '2025-01-16',
    reportDate: '2025-01-17',
  },
];

const statusConfig = {
  booked: { label: 'Booked', color: 'bg-blue-100 text-blue-800', icon: Clock },
  assigned: { label: 'Phlebotomist Assigned', color: 'bg-purple-100 text-purple-800', icon: Package },
  sample_collected: { label: 'Sample Collected', color: 'bg-yellow-100 text-yellow-800', icon: Package },
  processing: { label: 'Processing', color: 'bg-orange-100 text-orange-800', icon: Clock },
  report_ready: { label: 'Report Ready', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['booked', 'assigned', 'sample_collected', 'processing'].includes(order.status);
    if (activeTab === 'completed') return ['report_ready', 'completed'].includes(order.status);
    return false;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-jeevan-primary">My Orders</h1>
          <p className="mt-2 text-gray-600">Track your test bookings and download reports</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const statusInfo = statusConfig[order.status as keyof typeof statusConfig];
                const StatusIcon = statusInfo.icon;

                return (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Booked on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Tests:</p>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {order.tests.map((test, idx) => (
                              <Badge key={idx} variant="secondary">
                                {test}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-4 text-sm md:grid-cols-3">
                          <div>
                            <p className="text-gray-600">Collection Date</p>
                            <p className="font-medium">{new Date(order.collectionDate).toLocaleDateString()}</p>
                            {order.collectionTime && (
                              <p className="text-xs text-gray-500">{order.collectionTime}</p>
                            )}
                          </div>
                          {order.phlebotomist && (
                            <div>
                              <p className="text-gray-600">Phlebotomist</p>
                              <p className="font-medium">{order.phlebotomist}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-gray-600">Amount Paid</p>
                            <p className="font-medium text-jeevan-primary">₹{order.amount}</p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate({ to: '/orders/$orderId', params: { orderId: order.id } })}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          {order.status === 'report_ready' || order.status === 'completed' ? (
                            <Button
                              size="sm"
                              className="bg-jeevan-primary hover:bg-jeevan-accent"
                              onClick={() => navigate({ to: '/reports' })}
                            >
                              View Report
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filteredOrders.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-4 text-gray-600">No orders found</p>
                    <Button
                      className="mt-4 bg-jeevan-primary hover:bg-jeevan-accent"
                      onClick={() => navigate({ to: '/tests' })}
                    >
                      Book a Test
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
