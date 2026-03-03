import { useState } from 'react';
import { Search, Plus, Phone, Mail, Calendar, TrendingUp, Users, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadStatus = 'new' | 'contacted' | 'inProgress' | 'converted' | 'lost';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  serviceInterested: string;
  comments: string;
  status: LeadStatus;
  assignee: string;
  lastFollowUp: string;
  createdAt: string;
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    email: 'ramesh.kumar@email.com',
    serviceInterested: 'Doctor Consultation',
    comments: 'Needs home visit for elderly parent',
    status: 'new',
    assignee: 'Priya S.',
    lastFollowUp: '2025-01-28',
    createdAt: '2025-01-27',
  },
  {
    id: 2,
    name: 'Sunita Reddy',
    phone: '+91 87654 32109',
    email: 'sunita.reddy@email.com',
    serviceInterested: 'Lab Tests Package',
    comments: 'Interested in full body checkup',
    status: 'contacted',
    assignee: 'Amit P.',
    lastFollowUp: '2025-01-29',
    createdAt: '2025-01-26',
  },
  {
    id: 3,
    name: 'Vikram Singh',
    phone: '+91 76543 21098',
    email: 'vikram.singh@email.com',
    serviceInterested: 'Nursing Care',
    comments: 'Post-surgery care for 2 weeks',
    status: 'inProgress',
    assignee: 'Priya S.',
    lastFollowUp: '2025-01-30',
    createdAt: '2025-01-25',
  },
  {
    id: 4,
    name: 'Lakshmi Devi',
    phone: '+91 65432 10987',
    email: 'lakshmi.devi@email.com',
    serviceInterested: 'Physiotherapy',
    comments: 'Knee rehabilitation after surgery',
    status: 'converted',
    assignee: 'Ravi K.',
    lastFollowUp: '2025-01-28',
    createdAt: '2025-01-20',
  },
  {
    id: 5,
    name: 'Arun Sharma',
    phone: '+91 54321 09876',
    email: 'arun.sharma@email.com',
    serviceInterested: 'Corporate Health Package',
    comments: 'Company of 50 employees',
    status: 'inProgress',
    assignee: 'Amit P.',
    lastFollowUp: '2025-01-31',
    createdAt: '2025-01-22',
  },
  {
    id: 6,
    name: 'Meena Patel',
    phone: '+91 43210 98765',
    email: 'meena.patel@email.com',
    serviceInterested: 'Vaccination',
    comments: 'Family vaccination drive',
    status: 'lost',
    assignee: 'Ravi K.',
    lastFollowUp: '2025-01-25',
    createdAt: '2025-01-18',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<LeadStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
  new: { label: 'New', variant: 'default', icon: <Plus className="w-3 h-3" /> },
  contacted: { label: 'Contacted', variant: 'secondary', icon: <Phone className="w-3 h-3" /> },
  inProgress: { label: 'In Progress', variant: 'outline', icon: <Clock className="w-3 h-3" /> },
  converted: { label: 'Converted', variant: 'default', icon: <CheckCircle className="w-3 h-3" /> },
  lost: { label: 'Lost', variant: 'destructive', icon: <XCircle className="w-3 h-3" /> },
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  inProgress: 'bg-purple-100 text-purple-700 border-purple-200',
  converted: 'bg-green-100 text-green-700 border-green-200',
  lost: 'bg-red-100 text-red-700 border-red-200',
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminCRMPage() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [newLead, setNewLead] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterested: '',
    comments: '',
    assignee: '',
  });

  // ── Derived stats ──
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    inProgress: leads.filter(l => l.status === 'inProgress').length,
    converted: leads.filter(l => l.status === 'converted').length,
    conversionRate: leads.length > 0
      ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100)
      : 0,
  };

  // ── Filtered leads ──
  const filtered = leads.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.serviceInterested.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ── Handlers ──
  const handleStatusChange = (leadId: number, newStatus: LeadStatus) => {
    setLeads(prev =>
      prev.map(l => l.id === leadId ? { ...l, status: newStatus, lastFollowUp: new Date().toISOString().split('T')[0] } : l)
    );
    toast.success('Lead status updated');
  };

  const handleAddLead = async () => {
    if (!newLead.name.trim() || !newLead.phone.trim()) {
      toast.error('Name and phone are required');
      return;
    }
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 600));
    const lead: Lead = {
      id: Date.now(),
      ...newLead,
      status: 'new',
      lastFollowUp: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLeads(prev => [lead, ...prev]);
    setNewLead({ name: '', phone: '', email: '', serviceInterested: '', comments: '', assignee: '' });
    setShowAddDialog(false);
    setIsSaving(false);
    toast.success('Lead added successfully');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">CRM Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage leads and customer relationships</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Leads</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">New Leads</p>
                <p className="text-2xl font-bold text-gray-800">{stats.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">In Progress</p>
                <p className="text-2xl font-bold text-gray-800">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-800">{stats.conversionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, phone, email or service..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-gray-700">
            Leads ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Last Follow-up</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-gray-400">
                      No leads found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(lead => (
                    <TableRow key={lead.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-gray-800">{lead.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{lead.serviceInterested}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[lead.status]}`}>
                          {STATUS_CONFIG[lead.status].icon}
                          {STATUS_CONFIG[lead.status].label}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{lead.assignee}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {lead.lastFollowUp}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => setSelectedLead(lead)}
                          >
                            View
                          </Button>
                          <Select
                            value={lead.status}
                            onValueChange={(val) => handleStatusChange(lead.id, val as LeadStatus)}
                          >
                            <SelectTrigger className="h-7 text-xs w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="inProgress">In Progress</SelectItem>
                              <SelectItem value="converted">Converted</SelectItem>
                              <SelectItem value="lost">Lost</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="font-semibold text-gray-800">{selectedLead.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[selectedLead.status]}`}>
                    {STATUS_CONFIG[selectedLead.status].label}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-gray-700">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-700">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Service Interested</p>
                  <p className="text-sm text-gray-700">{selectedLead.serviceInterested}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Assignee</p>
                  <p className="text-sm text-gray-700">{selectedLead.assignee}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm text-gray-700">{selectedLead.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Last Follow-up</p>
                  <p className="text-sm text-gray-700">{selectedLead.lastFollowUp}</p>
                </div>
              </div>
              {selectedLead.comments && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Comments</p>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{selectedLead.comments}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLead(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Lead Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="lead-name">Name *</Label>
                <Input
                  id="lead-name"
                  placeholder="Full name"
                  value={newLead.name}
                  onChange={e => setNewLead(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lead-phone">Phone *</Label>
                <Input
                  id="lead-phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={newLead.phone}
                  onChange={e => setNewLead(p => ({ ...p, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lead-email">Email</Label>
                <Input
                  id="lead-email"
                  placeholder="email@example.com"
                  value={newLead.email}
                  onChange={e => setNewLead(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lead-service">Service Interested</Label>
                <Input
                  id="lead-service"
                  placeholder="e.g. Doctor Consultation"
                  value={newLead.serviceInterested}
                  onChange={e => setNewLead(p => ({ ...p, serviceInterested: e.target.value }))}
                />
              </div>
              <div className="space-y-1 col-span-2">
                <Label htmlFor="lead-assignee">Assignee</Label>
                <Input
                  id="lead-assignee"
                  placeholder="Assign to team member"
                  value={newLead.assignee}
                  onChange={e => setNewLead(p => ({ ...p, assignee: e.target.value }))}
                />
              </div>
              <div className="space-y-1 col-span-2">
                <Label htmlFor="lead-comments">Comments</Label>
                <Textarea
                  id="lead-comments"
                  placeholder="Additional notes..."
                  rows={3}
                  value={newLead.comments}
                  onChange={e => setNewLead(p => ({ ...p, comments: e.target.value }))}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleAddLead} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
              Add Lead
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
