import { useState, useMemo } from 'react';
import { Search, Plus, Phone, Mail, User, Loader2, AlertCircle, Users, Wallet, Calendar, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAllCustomers, useAddCustomer, useUpdateCustomer, useDeleteCustomer, usePatientsByCustomerId } from '../../hooks/useQueries';
import { Customer } from '../../backend';
import { toast } from 'sonner';

export default function AdminCustomersPage() {
  const { data: customers, isLoading, error } = useAllCustomers();
  const addCustomerMutation = useAddCustomer();
  const updateCustomerMutation = useUpdateCustomer();
  const deleteCustomerMutation = useDeleteCustomer();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    referralCode: '',
  });

  const { data: selectedCustomerPatients } = usePatientsByCustomerId(selectedCustomer?.customerId || null);

  const filteredCustomers = useMemo(() => {
    if (!customers) return [];
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [customers, searchTerm]);

  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.phone) {
      toast.error('Name and phone are required');
      return;
    }

    try {
      await addCustomerMutation.mutateAsync({
        ...newCustomer,
        principalId: null,
      });
      toast.success('Customer added successfully');
      setIsAddDialogOpen(false);
      setNewCustomer({ name: '', phone: '', email: '', referralCode: '' });
    } catch (error) {
      console.error('Failed to add customer:', error);
      toast.error('Failed to add customer. Please try again.');
    }
  };

  const handleDeleteCustomer = async (customerId: bigint) => {
    if (!confirm('Are you sure you want to deactivate this customer?')) return;

    try {
      await deleteCustomerMutation.mutateAsync(customerId);
      toast.success('Customer deactivated successfully');
      setIsDetailsDialogOpen(false);
    } catch (error) {
      console.error('Failed to delete customer:', error);
      toast.error('Failed to deactivate customer. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Card className="w-96 rounded-xl shadow-md">
          <CardContent className="flex flex-col items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-jeevan-primary" />
            <p className="mt-4 text-lg font-medium text-gray-700">Loading customers...</p>
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
                Unable to load customer data. Please check your connection and try again.
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
          <h1 className="text-3xl font-bold text-jeevan-primary">Customer Management</h1>
          <p className="mt-2 text-gray-600">Manage customer profiles and family members</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-lg bg-jeevan-primary hover:bg-jeevan-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-xl text-jeevan-primary">Add New Customer</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-4 pr-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    placeholder="Enter name"
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    placeholder="Enter email"
                    className="mt-2 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="referralCode">Referral Code</Label>
                  <Input
                    id="referralCode"
                    value={newCustomer.referralCode}
                    onChange={(e) => setNewCustomer({ ...newCustomer, referralCode: e.target.value })}
                    placeholder="Enter referral code"
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
                onClick={handleAddCustomer}
                disabled={addCustomerMutation.isPending}
                className="rounded-lg bg-jeevan-primary hover:bg-jeevan-primary/90"
              >
                {addCustomerMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Customer'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-5 w-5 text-jeevan-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-jeevan-primary">{customers?.length || 0}</div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden rounded-xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <User className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {customers?.filter((c) => c.status === 'active').length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6 rounded-xl shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search customers by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-lg pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Referral Code</TableHead>
                  <TableHead>Wallet Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers && filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.customerId.toString()} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="mr-1 h-3 w-3 text-jeevan-primary" />
                            {customer.phone}
                          </div>
                          {customer.email && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="mr-1 h-3 w-3 text-jeevan-teal" />
                              {customer.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{customer.referralCode || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Wallet className="mr-1 h-4 w-4 text-jeevan-teal" />
                          ₹{customer.walletBalance.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={customer.status === 'active' ? 'default' : 'destructive'}
                          className="rounded-full"
                        >
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3 w-3 text-gray-400" />
                          {new Date(Number(customer.createdAt) / 1000000).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setIsDetailsDialogOpen(true);
                          }}
                          className="rounded-lg border-jeevan-primary text-jeevan-primary hover:bg-jeevan-primary hover:text-white"
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="mb-4 h-12 w-12 text-gray-300" />
                        <p className="text-lg font-medium text-gray-500">No customers found</p>
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
            <DialogTitle className="text-xl text-jeevan-primary">Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <Label className="text-sm font-medium text-gray-600">Name</Label>
                  <p className="text-lg font-semibold text-jeevan-primary">{selectedCustomer.name}</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <Label className="text-sm font-medium text-gray-600">Phone</Label>
                    <p className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-jeevan-primary" />
                      {selectedCustomer.phone}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <Label className="text-sm font-medium text-gray-600">Email</Label>
                    <p className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-jeevan-teal" />
                      {selectedCustomer.email || '-'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <Label className="text-sm font-medium text-gray-600">Referral Code</Label>
                    <p className="mt-1">{selectedCustomer.referralCode || '-'}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <Label className="text-sm font-medium text-gray-600">Wallet Balance</Label>
                    <p className="mt-1 flex items-center text-lg font-semibold text-jeevan-teal">
                      <Wallet className="mr-2 h-5 w-5" />
                      ₹{selectedCustomer.walletBalance.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <Label className="text-sm font-medium text-gray-600">Status</Label>
                  <Badge
                    variant={selectedCustomer.status === 'active' ? 'default' : 'destructive'}
                    className="mt-2 rounded-full"
                  >
                    {selectedCustomer.status}
                  </Badge>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <Label className="text-sm font-medium text-gray-600">Family Members</Label>
                  <div className="mt-2 space-y-2">
                    {selectedCustomerPatients && selectedCustomerPatients.length > 0 ? (
                      selectedCustomerPatients.map((patient) => (
                        <div
                          key={patient.patientId.toString()}
                          className="flex items-center justify-between rounded-lg border bg-white p-3"
                        >
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-600">
                              {patient.relationship} • {patient.gender}
                            </p>
                          </div>
                          {patient.isPrimary && (
                            <Badge variant="outline" className="rounded-full">
                              Primary
                            </Badge>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No family members added</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteCustomer(selectedCustomer.customerId)}
                    disabled={deleteCustomerMutation.isPending}
                    className="rounded-lg"
                  >
                    {deleteCustomerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deactivating...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Deactivate Customer
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
