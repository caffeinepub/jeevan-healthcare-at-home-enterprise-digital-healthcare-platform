import { Package, MapPin, Calendar, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAllBookings } from '../../hooks/useQueries';

export default function AdminOrdersPage() {
  const { data: bookings, isLoading, error } = useAllBookings();

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
            <p className="text-destructive">Failed to load orders</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jeevan-primary">Order Management</h1>
        <p className="mt-2 text-gray-600">Manage all customer bookings and orders</p>
      </div>

      <div className="space-y-4">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking) => (
            <Card key={booking.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{booking.id.toString()}</CardTitle>
                    <p className="text-sm text-muted-foreground">{booking.userName}</p>
                  </div>
                  <Badge variant="secondary">
                    {booking.serviceRequest.urgent ? 'Urgent' : 'Standard'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                    <p className="text-sm">{booking.address}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Package className="mt-0.5 h-4 w-4 text-gray-500" />
                    <p className="text-sm">{booking.serviceRequest.description}</p>
                  </div>
                  {booking.serviceRequest.preferredDate && (
                    <div className="flex items-start space-x-2">
                      <Calendar className="mt-0.5 h-4 w-4 text-gray-500" />
                      <p className="text-sm">
                        Preferred Date: {new Date(Number(booking.serviceRequest.preferredDate)).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div className="pt-2">
                    <p className="text-sm font-medium text-jeevan-primary">
                      Budget: ₹{booking.budget.toString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-600">No orders found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
