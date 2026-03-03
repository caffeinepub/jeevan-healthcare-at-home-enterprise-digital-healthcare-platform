import { useState, useMemo } from 'react';
import { Search, Plus, User, Loader2, AlertCircle, Users, Heart, Calendar, Edit, Trash2, Activity } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { useAllPatients, useAllCustomers, useAddPatient, useUpdatePatient, useDeletePatient, useVitalsByPatientId } from '../../hooks/useQueries';
import { Patient } from '../../backend';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';

export default function AdminPatientsPage() {
  const navigate = useNavigate();
  const { data: patients, isLoading, error } = useAllPatients();
  const { data: customers } = useAllCustomers();
  const addPatientMutation = useAddPatient();
  const updatePatientMutation = useUpdatePatient();
  const deletePatientMutation = useDeletePatient();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const [newPatient, setNewPatient] = useState({
    customerId: '',
    name: '',
    dob: '',
    gender: '',
    relationship: '',
    bloodGroup: '',
    chronicConditions: '',
    emergencyContact: '',
    isPrimary: false,
  });

  const { data: selectedPatientVitals } = useVitalsByPatientId(selectedPatient?.patientId || null);

  const filteredPatients = useMemo(() => {
    if (!patients) return [];
    return patients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [patients, searchTerm]);

  const handleAddPatient = async () => {
    if (!newPatient.customerId || !newPatient.name || !newPatient.dob || !newPatient.gender) {
      toast.error('Customer, name, date of birth, and gender are required');
      return;
    }

    try {
      const chronicConditionsArray = newPatient.chronicConditions
        ? newPatient.chronicConditions.split(',').map((c) => c.trim())
        : [];

      await addPatientMutation.mutateAsync({
        customerId: BigInt(newPatient.customerId),
        name: newPatient.name,
        dob: newPatient.dob,
        gender: newPatient.gender,
        relationship: newPatient.relationship,
        bloodGroup: newPatient.bloodGroup,
        chronicConditions: chronicConditionsArray,
        emergencyContact: newPatient.emergencyContact,
        isPrimary: newPatient.isPrimary,
      });
      toast.success('Patient added successfully');
      setIsAddDialogOpen(false);
      setNewPatient({
        customerId: '',
        name: '',
        dob: '',
        gender: '',
        relationship: '',
        bloodGroup: '',
        chronicConditions: '',
        emergencyContact: '',
        isPrimary: false,
      });
    } catch (error) {
      console.error('Failed to add patient:', error);
      toast.error('Failed to add patient. Please try again.');
    }
  };

  const handleDeletePatient = async (patientId: bigint) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    try {
      await deletePatientMutation.mutateAsync(patientId);
      toast.success('Patient deleted successfully');
      setIsDetailsDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete patient:', error);
      toast.error('Failed to delete patient. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-96 rounded-xl shadow-md">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-jeevan-primary" />
            <p className="mt-4 text-lg font-medium text-gray-700">Loading patients...</p>
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
                Unable to load patient data. Please check your connection and try again.
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
          <h1 className="text-3xl font-bold text-jeevan-primary">Patient Management</h1>
          <p className="mt-2 text-gray-600">Manage patient profiles and health data</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-lg bg-jeevan-primary hover:bg-jeevan-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl text-jeevan-primary">Add New Patient</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-4 pr-4">
                <div>
                  <Label htmlFor="customerId">Customer *</Label>
                  <Select value={newPatient.customerId} onValueChange={(value) => setNewPatient({ ...newPatient, customerId: value })}>
                    <SelectTrigger className="mt-2 rounded-lg">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers?.map((customer) => (
                        <SelectItem key={customer.customerId.toString()} value={customer.customerId.toString()}>
                          {customer.name} - {customer.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                    placeholder="Enter name"
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={newPatient.dob}
                    onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={newPatient.gender} onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}>
                    <SelectTrigger className="mt-2 rounded-lg">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="relationship">Relationship</Label>
                  <Input
                    id="relationship"
                    value={newPatient.relationship}
                    onChange={(e) => setNewPatient({ ...newPatient, relationship: e.target.value })}
                    placeholder="e.g., Self, Spouse, Child"
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input
                    id="bloodGroup"
                    value={newPatient.bloodGroup}
                    onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
                    placeholder="e.g., A+, O-, B+"
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="chronicConditions">Chronic Conditions (comma-separated)</Label>
                  <Textarea
                    id="chronicConditions"
                    value={newPatient.chronicConditions}
                    onChange={(e) => setNewPatient({ ...newPatient, chronicConditions: e.target.value })}
                    placeholder="e.g., Diabetes, Hypertension"
                    rows={2}
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={newPatient.emergencyContact}
                    onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                    placeholder="Enter emergency contact number"
                    className="mt-2 rounded-lg"
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-lg">
                Cancel
              </Button>
              <Button
                onClick={handleAddPatient}
                disabled={addPatientMutation.isPending}
                className="rounded-lg bg-jeevan-primary hover:bg-jeevan-primary/90"
              >
                {addPatientMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Patient'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-5 w-5 text-jeevan-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-jeevan-primary">{patients?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Chronic Conditions</CardTitle>
            <Heart className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {patients?.filter((p) => p.chronicConditions.length > 0).length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 rounded-xl shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search patients by name or blood group..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>All Patients ({filteredPatients?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age / Gender</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Relationship</TableHead>
                  <TableHead>Chronic Conditions</TableHead>
                  <TableHead>Emergency Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients && filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => {
                    const age = patient.dob ? new Date().getFullYear() - new Date(patient.dob).getFullYear() : '-';
                    return (
                      <TableRow key={patient.patientId.toString()} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {patient.name}
                            {patient.isPrimary && (
                              <Badge variant="outline" className="ml-2 rounded-full">
                                Primary
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {age} yrs • {patient.gender}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="rounded-full">
                            {patient.bloodGroup || '-'}
                          </Badge>
                        </TableCell>
                        <TableCell>{patient.relationship || '-'}</TableCell>
                        <TableCell>
                          {patient.chronicConditions.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {patient.chronicConditions.map((condition, idx) => (
                                <Badge key={idx} variant="destructive" className="rounded-full text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </TableCell>
                        <TableCell>{patient.emergencyContact || '-'}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedPatient(patient);
                              setIsDetailsDialogOpen(true);
                            }}
                            className="rounded-lg border-jeevan-primary text-jeevan-primary hover:bg-jeevan-primary hover:text-white"
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="mb-4 h-12 w-12 text-gray-300" />
                        <p className="text-lg font-medium text-gray-500">No patients found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl text-jeevan-primary">Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <Label className="text-sm font-medium text-gray-600">Name</Label>
                  <p className="text-lg font-semibold text-jeevan-primary">{selectedPatient.name}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <Label className="text-sm font-medium text-gray-600">Date of Birth</Label>
                    <p className="mt-1">{selectedPatient.dob}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <Label className="text-sm font-medium text-gray-600">Gender</Label>
                    <p className="mt-1">{selectedPatient.gender}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <Label className="text-sm font-medium text-gray-600">Blood Group</Label>
                    <Badge variant="secondary" className="mt-2 rounded-full">
                      {selectedPatient.bloodGroup || '-'}
                    </Badge>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <Label className="text-sm font-medium text-gray-600">Relationship</Label>
                    <p className="mt-1">{selectedPatient.relationship || '-'}</p>
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <Label className="text-sm font-medium text-gray-600">Chronic Conditions</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedPatient.chronicConditions.length > 0 ? (
                      selectedPatient.chronicConditions.map((condition, idx) => (
                        <Badge key={idx} variant="destructive" className="rounded-full">
                          {condition}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">None</span>
                    )}
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <Label className="text-sm font-medium text-gray-600">Emergency Contact</Label>
                  <p className="mt-1">{selectedPatient.emergencyContact || '-'}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <Label className="text-sm font-medium text-gray-600">Recent Vitals</Label>
                  <div className="mt-2 space-y-2">
                    {selectedPatientVitals && selectedPatientVitals.length > 0 ? (
                      selectedPatientVitals.slice(0, 5).map((vital) => (
                        <div
                          key={vital.vitalId.toString()}
                          className="flex items-center justify-between rounded-lg border bg-white p-3"
                        >
                          <div>
                            <p className="font-medium">{vital.type}</p>
                            <p className="text-sm text-gray-600">
                              {vital.reading} {vital.unit}
                            </p>
                          </div>
                          <Badge
                            variant={
                              vital.status === 'normal'
                                ? 'default'
                                : vital.status === 'moderate'
                                  ? 'secondary'
                                  : 'destructive'
                            }
                            className="rounded-full"
                          >
                            {vital.status}
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No vitals recorded</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => navigate({ to: '/admin/vitals', search: { patientId: selectedPatient.patientId.toString() } })}
                    className="mt-3 w-full rounded-lg border-jeevan-primary text-jeevan-primary hover:bg-jeevan-primary hover:text-white"
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    View All Vitals
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleDeletePatient(selectedPatient.patientId)}
                    disabled={deletePatientMutation.isPending}
                    className="rounded-lg"
                  >
                    {deletePatientMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Patient
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
