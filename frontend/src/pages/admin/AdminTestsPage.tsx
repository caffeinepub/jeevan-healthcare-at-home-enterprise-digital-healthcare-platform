import { TestTube, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAllServices } from '../../hooks/useQueries';

export default function AdminTestsPage() {
  const { data: services, isLoading, error } = useAllServices();

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
            <p className="text-destructive">Failed to load services</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jeevan-primary">Tests & Packages</h1>
        <p className="mt-2 text-gray-600">Manage diagnostic tests and health packages</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services && services.length > 0 ? (
          services.map((service) => (
            <Card key={service.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <Badge variant={service.isActive ? 'default' : 'secondary'}>
                    {service.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">{service.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">{service.category}</Badge>
                  <Badge variant="outline">{service.subcategory}</Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <TestTube className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-600">No services found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
