import { MapPin, Clock, TestTube, Navigation, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSampleCollections } from '../../hooks/useQueries';

export default function PhlebotomistCollectionsPage() {
  const { data: collections, isLoading, error } = useSampleCollections();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Assigned':
        return 'bg-blue-100 text-blue-800';
      case 'On Way':
        return 'bg-orange-100 text-orange-800';
      case 'Sample Collected':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            <p className="text-destructive">Failed to load collections</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jeevan-primary">My Collections</h1>
        <p className="mt-2 text-gray-600">Assigned sample collections for today</p>
      </div>

      <div className="space-y-4">
        {collections && collections.length > 0 ? (
          collections.map((collection) => (
            <Card key={collection.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{collection.patientName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Collection #{collection.id.toString()}
                    </p>
                  </div>
                  <Badge className={getStatusColor(collection.status)}>{collection.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-gray-500" />
                    <p className="text-sm">{collection.address}</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="mt-0.5 h-4 w-4 text-gray-500" />
                    <p className="text-sm">
                      Scheduled: {new Date(Number(collection.scheduledTime) * 1000).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <TestTube className="mt-0.5 h-4 w-4 text-gray-500" />
                    <div className="flex flex-wrap gap-2">
                      {collection.testNames.map((test, idx) => (
                        <Badge key={idx} variant="secondary">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(collection.address)}`,
                          '_blank'
                        );
                      }}
                    >
                      <Navigation className="mr-2 h-4 w-4" />
                      Navigate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <TestTube className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-600">No collections assigned for today</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
