import { Users, Shield, Activity, Syringe, Building, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useListAllUsers } from '../../hooks/useQueries';
import { HealthcareRole } from '../../backend';

export default function AdminUsersPage() {
  const { data: users, isLoading, error } = useListAllUsers();

  const getRoleIcon = (role: HealthcareRole) => {
    switch (role) {
      case HealthcareRole.admin:
        return Shield;
      case HealthcareRole.labExecutive:
        return Activity;
      case HealthcareRole.phlebotomist:
        return Syringe;
      case HealthcareRole.corporateAdmin:
      case HealthcareRole.franchiseAdmin:
        return Building;
      default:
        return Users;
    }
  };

  const getRoleLabel = (role: HealthcareRole) => {
    switch (role) {
      case HealthcareRole.admin:
        return 'Admin';
      case HealthcareRole.labExecutive:
        return 'Lab Executive';
      case HealthcareRole.phlebotomist:
        return 'Phlebotomist';
      case HealthcareRole.corporateAdmin:
        return 'Corporate Admin';
      case HealthcareRole.franchiseAdmin:
        return 'Franchise Admin';
      case HealthcareRole.patient:
        return 'Patient';
      default:
        return 'Unknown';
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
            <p className="text-destructive">Failed to load users</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-jeevan-primary">User Management</h1>
        <p className="mt-2 text-gray-600">Manage system users and their roles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {users && users.length > 0 ? (
          users.map(([principal, profile]) => {
            const RoleIcon = getRoleIcon(profile.role);
            return (
              <Card key={principal.toString()}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-jeevan-primary/10 p-2">
                        <RoleIcon className="h-5 w-5 text-jeevan-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{profile.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{profile.email}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Role:</span>
                      <Badge variant="secondary">{getRoleLabel(profile.role)}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge variant={profile.isActive ? 'default' : 'outline'}>
                        {profile.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-gray-500">Phone: {profile.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-4 text-gray-600">No users found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
