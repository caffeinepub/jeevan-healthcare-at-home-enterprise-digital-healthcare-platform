import { User, Mail, Phone, Award, Calendar, Upload, Bell, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DoctorProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-jeevan-text">Profile & Settings</h1>
          <p className="mt-2 text-gray-600">Manage your profile information and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-jeevan-text">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-jeevan-primary/10">
                    <User className="h-12 w-12 text-jeevan-primary" />
                  </div>
                  <div>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="mt-2 text-sm text-gray-600">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Dr. John Doe" />
                  </div>
                  <div>
                    <Label>Specialization</Label>
                    <Input placeholder="General Physician" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="doctor@example.com" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Bio</Label>
                    <Textarea placeholder="Brief description about yourself..." />
                  </div>
                </div>

                <Button className="bg-jeevan-primary hover:bg-jeevan-teal">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Qualifications Tab */}
          <TabsContent value="qualifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-jeevan-text">Education & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Medical Degree</Label>
                  <Input placeholder="MBBS, MD" />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Input type="number" placeholder="10" />
                </div>
                <div>
                  <Label>Certifications</Label>
                  <Textarea placeholder="List your certifications..." />
                </div>
                <div>
                  <Label>Upload Certificates</Label>
                  <div className="mt-2 rounded-lg border-2 border-dashed p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, JPG or PNG (max. 5MB)</p>
                  </div>
                </div>

                <Button className="bg-jeevan-primary hover:bg-jeevan-teal">
                  Save Qualifications
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-jeevan-text">Working Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <Switch />
                      <span className="font-medium">{day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="time" className="w-32" defaultValue="09:00" />
                      <span>to</span>
                      <Input type="time" className="w-32" defaultValue="17:00" />
                    </div>
                  </div>
                ))}

                <Button className="w-full bg-jeevan-primary hover:bg-jeevan-teal">
                  Save Availability
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-jeevan-text">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">New Appointments</p>
                      <p className="text-sm text-gray-600">Get notified about new bookings</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Appointment Reminders</p>
                      <p className="text-sm text-gray-600">Reminders before consultations</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-jeevan-text">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-5 w-5" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-5 w-5" />
                  Two-Factor Authentication
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
