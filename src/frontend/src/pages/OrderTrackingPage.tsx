import { useParams } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';

export default function OrderTrackingPage() {
  const { orderId } = useParams({ from: '/orders/$orderId' });

  const timeline = [
    { status: 'Booking Confirmed', date: '2025-01-25 10:30 AM', completed: true },
    { status: 'Phlebotomist Assigned', date: '2025-01-25 11:00 AM', completed: true },
    { status: 'On the Way', date: '2025-01-26 08:15 AM', completed: true },
    { status: 'Sample Collected', date: '2025-01-26 08:45 AM', completed: true },
    { status: 'Received at Lab', date: '2025-01-26 10:30 AM', completed: false },
    { status: 'Processing', date: 'Pending', completed: false },
    { status: 'Report Ready', date: 'Pending', completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Tracking - {orderId}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    {item.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                    {idx < timeline.length - 1 && (
                      <div className={`h-12 w-0.5 ${item.completed ? 'bg-green-600' : 'bg-gray-300'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                      {item.status}
                    </p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
