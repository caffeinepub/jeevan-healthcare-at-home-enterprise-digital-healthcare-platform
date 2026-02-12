import { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { useDoctorAppointments, useUpdateDoctorAppointment } from '../../hooks/useQueries';

export default function DoctorAppointmentsPage() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const { data: appointments, isLoading, error } = useDoctorAppointments();
  const updateAppointment = useUpdateDoctorAppointment();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAccept = async (appointment: any) => {
    try {
      await updateAppointment.mutateAsync({
        appointmentId: appointment.appointmentId,
        updatedAppointment: { ...appointment, status: 'confirmed' },
      });
      toast.success('Appointment accepted successfully');
    } catch (error) {
      toast.error('Failed to accept appointment');
    }
  };

  const handleCancel = async (appointment: any) => {
    try {
      await updateAppointment.mutateAsync({
        appointmentId: appointment.appointmentId,
        updatedAppointment: { ...appointment, status: 'cancelled' },
      });
      toast.success('Appointment cancelled');
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const handleComplete = async (appointment: any) => {
    try {
      await updateAppointment.mutateAsync({
        appointmentId: appointment.appointmentId,
        updatedAppointment: { ...appointment, status: 'completed' },
      });
      toast.success('Appointment marked as completed');
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load appointments. Please try again later.
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
            <h1 className="font-heading text-3xl font-bold text-jeevan-text">My Appointments</h1>
            <p className="mt-2 text-gray-600">Manage your consultation schedule</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={view === 'day' ? 'default' : 'outline'}
              onClick={() => setView('day')}
              className={view === 'day' ? 'bg-jeevan-primary' : ''}
            >
              Day
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'outline'}
              onClick={() => setView('week')}
              className={view === 'week' ? 'bg-jeevan-primary' : ''}
            >
              Week
            </Button>
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              onClick={() => setView('month')}
              className={view === 'month' ? 'bg-jeevan-primary' : ''}
            >
              Month
            </Button>
          </div>
        </div>

        {/* Appointments List */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <Card key={Number(appointment.appointmentId)} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-jeevan-primary/10">
                            <User className="h-6 w-6 text-jeevan-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-jeevan-text">Patient ID: {Number(appointment.patientId)}</h3>
                            <p className="text-sm text-gray-600">{appointment.consultationType}</p>
                          </div>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>

                        <div className="grid gap-2 md:grid-cols-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(Number(appointment.scheduledDateTime) / 1000000).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{new Date(Number(appointment.scheduledDateTime) / 1000000).toLocaleTimeString()}</span>
                          </div>
                        </div>

                        {appointment.notes && (
                          <p className="text-sm text-gray-600">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        )}
                      </div>

                      <div className="ml-4 flex flex-col gap-2">
                        {appointment.status === 'scheduled' && (
                          <Button 
                            size="sm" 
                            className="bg-jeevan-primary hover:bg-jeevan-teal"
                            onClick={() => handleAccept(appointment)}
                            disabled={updateAppointment.isPending}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Accept
                          </Button>
                        )}
                        {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                          <>
                            <Button size="sm" variant="outline">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Reschedule
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleCancel(appointment)}
                              disabled={updateAppointment.isPending}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel
                            </Button>
                          </>
                        )}
                        {appointment.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleComplete(appointment)}
                            disabled={updateAppointment.isPending}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-gray-600">No upcoming appointments</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-600">No appointments scheduled for today</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-600">No past appointments</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

