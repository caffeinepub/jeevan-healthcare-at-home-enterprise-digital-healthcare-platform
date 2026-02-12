import { useState } from 'react';
import { Search, User, FileText, Activity, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDoctorPatients } from '../../hooks/useQueries';

export default function DoctorPatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: patients, isLoading, error } = useDoctorPatients();

  const filteredPatients = patients?.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load patient records. Please try again later.
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
          <h1 className="font-heading text-3xl font-bold text-jeevan-text">Patient Records</h1>
          <p className="mt-2 text-gray-600">View and manage patient information</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search patients by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))
          ) : filteredPatients && filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <Card key={Number(patient.patientId)} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-jeevan-primary/10">
                          <User className="h-6 w-6 text-jeevan-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-jeevan-text">{patient.name}</h3>
                          <p className="text-sm text-gray-600">
                            {patient.gender} • {patient.dob}
                          </p>
                        </div>
                        {patient.isPrimary && (
                          <Badge className="bg-jeevan-teal">Primary</Badge>
                        )}
                      </div>

                      <div className="grid gap-2 md:grid-cols-3">
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Blood Group:</span>{' '}
                          <span className="text-gray-600">{patient.bloodGroup || 'N/A'}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Relationship:</span>{' '}
                          <span className="text-gray-600">{patient.relationship}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Emergency:</span>{' '}
                          <span className="text-gray-600">{patient.emergencyContact}</span>
                        </div>
                      </div>

                      {patient.chronicConditions && patient.chronicConditions.length > 0 && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Chronic Conditions:</span>{' '}
                          <span className="text-gray-600">{patient.chronicConditions.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex flex-col gap-2">
                      <Button size="sm" className="bg-jeevan-primary hover:bg-jeevan-teal">
                        <FileText className="mr-2 h-4 w-4" />
                        View History
                      </Button>
                      <Button size="sm" variant="outline">
                        <Activity className="mr-2 h-4 w-4" />
                        View Vitals
                      </Button>
                      <Button size="sm" variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Notes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-600">
                  {searchQuery ? 'No patients found matching your search' : 'No patient records available'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
