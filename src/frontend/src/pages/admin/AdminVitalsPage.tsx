import { useState, useMemo } from 'react';
import { Search, Plus, Activity, Loader2, AlertCircle, TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAllVitals, useAllPatients, useAddVital, useUpdateVital, useDeleteVital } from '../../hooks/useQueries';
import { Vital } from '../../backend';
import { toast } from 'sonner';

export default function AdminVitalsPage() {
  const { data: vitals, isLoading, error } = useAllVitals();
  const { data: patients } = useAllPatients();
  const addVitalMutation = useAddVital();
  const updateVitalMutation = useUpdateVital();
  const deleteVitalMutation = useDeleteVital();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newVital, setNewVital] = useState({
    patientId: '',
    type: '',
    reading: '',
    unit: '',
    status: 'normal',
  });

  const filteredVitals = useMemo(() => {
    if (!vitals) return [];
    return vitals.filter((vital) => {
      const patient = patients?.find((p) => p.patientId === vital.patientId);
      const patientName = patient?.name || '';
      const matchesSearch =
        patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vital.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || vital.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vitals, patients, searchTerm, statusFilter]);

  const handleAddVital = async () => {
    if (!newVital.patientId || !newVital.type || !newVital.reading || !newVital.unit) {
      toast.error('All fields are required');
      return;
    }

    try {
      await addVitalMutation.mutateAsync({
        patientId: BigInt(newVital.patientId),
        type: newVital.type,
        reading: newVital.reading,
        unit: newVital.unit,
        status: newVital.status,
      });
      toast.success('Vital added successfully');
      setIsAddDialogOpen(false);
      setNewVital({
        patientId: '',
        type: '',
        reading: '',
        unit: '',
        status: 'normal',
      });
    } catch (error) {
      console.error('Failed to add vital:', error);
      toast.error('Failed to add vital. Please try again.');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <Minus className="h-4 w-4 text-green-600" />;
      case 'moderate':
        return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case 'critical':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'normal':
        return 'default';
      case 'moderate':
        return 'secondary';
      case 'critical':
        return 'destructive';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-96 rounded-xl shadow-md">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-jeevan-primary" />
            <p className="mt-4 text-lg font-medium text-gray-700">Loading vitals...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md rounded-xl shadow-md">
          <CardContent className="py-8">
            <Alert variant="destructive">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold">Connection Error</AlertTitle>
              <AlertDescription className="mt-2">
                Unable to load vitals data. Please check your connection and try again.
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => window.location.reload()}
              className="mt-6 w-full rounded-lg bg-jeevan-primary hover:bg-jeevan-primary/90"
            >
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-jeevan-primary">Vitals & Health Tracker</h1>
          <p className="mt-2 text-gray-600">Monitor patient health vitals and trends</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-lg bg-jeevan-primary hover:bg-jeevan-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Vital
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl text-jeevan-primary">Add New Vital</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-4 pr-4">
                <div>
                  <Label htmlFor="patientId">Patient *</Label>
                  <Select value={newVital.patientId} onValueChange={(value) => setNewVital({ ...newVital, patientId: value })}>
                    <SelectTrigger className="mt-2 rounded-lg">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients?.map((patient) => (
                        <SelectItem key={patient.patientId.toString()} value={patient.patientId.toString()}>
                          {patient.name} - {patient.gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Vital Type *</Label>
                  <Select value={newVital.type} onValueChange={(value) => setNewVital({ ...newVital, type: value })}>
                    <SelectTrigger className="mt-2 rounded-lg">
                      <SelectValue placeholder="Select vital type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Blood Pressure">Blood Pressure</SelectItem>
                      <SelectItem value="Blood Sugar">Blood Sugar</SelectItem>
                      <SelectItem value="SpO2">SpO2</SelectItem>
                      <SelectItem value="Heart Rate">Heart Rate</SelectItem>
                      <SelectItem value="Temperature">Temperature</SelectItem>
                      <SelectItem value="Weight">Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reading">Reading *</Label>
                  <Input
                    id="reading"
                    value={newVital.reading}
                    onChange={(e) => setNewVital({ ...newVital, reading: e.target.value })}
                    placeholder="e.g., 120/80, 98, 72"
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit *</Label>
                  <Input
                    id="unit"
                    value={newVital.unit}
                    onChange={(e) => setNewVital({ ...newVital, unit: e.target.value })}
                    placeholder="e.g., mmHg, mg/dL, %, bpm"
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select value={newVital.status} onValueChange={(value) => setNewVital({ ...newVital, status: value })}>
                    <SelectTrigger className="mt-2 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-lg">
                Cancel
              </Button>
              <Button
                onClick={handleAddVital}
                disabled={addVitalMutation.isPending}
                className="rounded-lg bg-jeevan-primary hover:bg-jeevan-primary/90"
              >
                {addVitalMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Vital'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vitals</CardTitle>
            <Activity className="h-5 w-5 text-jeevan-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-jeevan-primary">{vitals?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Normal</CardTitle>
            <Minus className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {vitals?.filter((v) => v.status === 'normal').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moderate</CardTitle>
            <TrendingUp className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {vitals?.filter((v) => v.status === 'moderate').length || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <TrendingDown className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {vitals?.filter((v) => v.status === 'critical').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 rounded-xl shadow-sm">
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by patient name or vital type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>All Vitals ({filteredVitals?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Vital Type</TableHead>
                  <TableHead>Reading</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVitals && filteredVitals.length > 0 ? (
                  filteredVitals.map((vital) => {
                    const patient = patients?.find((p) => p.patientId === vital.patientId);
                    return (
                      <TableRow key={vital.vitalId.toString()} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{patient?.name || 'Unknown'}</TableCell>
                        <TableCell>{vital.type}</TableCell>
                        <TableCell>
                          {vital.reading} {vital.unit}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(vital.status)} className="flex w-fit items-center gap-1 rounded-full">
                            {getStatusIcon(vital.status)}
                            {vital.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3 text-gray-400" />
                            {new Date(Number(vital.timestamp) / 1000000).toLocaleString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Activity className="mb-4 h-12 w-12 text-gray-300" />
                        <p className="text-lg font-medium text-gray-500">No vitals found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
