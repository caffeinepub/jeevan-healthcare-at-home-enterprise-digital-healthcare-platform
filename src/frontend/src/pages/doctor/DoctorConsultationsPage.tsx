import { Video, Phone, MessageSquare, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DoctorConsultationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-jeevan-text">Consultations</h1>
          <p className="mt-2 text-gray-600">Conduct teleconsultations and manage prescriptions</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Consultation Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-jeevan-text">Teleconsultation Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-lg bg-gray-900 flex items-center justify-center mb-4">
                  <div className="text-center text-white">
                    <Video className="mx-auto h-16 w-16 mb-4 opacity-50" />
                    <p className="text-lg">Video consultation will appear here</p>
                    <p className="text-sm opacity-75 mt-2">Start a consultation to begin</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button className="bg-jeevan-primary hover:bg-jeevan-teal">
                    <Video className="mr-2 h-5 w-5" />
                    Start Video
                  </Button>
                  <Button variant="outline">
                    <Phone className="mr-2 h-5 w-5" />
                    Audio Only
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* SOAP Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl text-jeevan-text">SOAP Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="subjective" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="subjective">Subjective</TabsTrigger>
                    <TabsTrigger value="objective">Objective</TabsTrigger>
                    <TabsTrigger value="assessment">Assessment</TabsTrigger>
                    <TabsTrigger value="plan">Plan</TabsTrigger>
                  </TabsList>

                  <TabsContent value="subjective">
                    <Textarea
                      placeholder="Patient's symptoms, complaints, and history..."
                      className="min-h-[150px]"
                    />
                  </TabsContent>

                  <TabsContent value="objective">
                    <Textarea
                      placeholder="Physical examination findings, vital signs, test results..."
                      className="min-h-[150px]"
                    />
                  </TabsContent>

                  <TabsContent value="assessment">
                    <Textarea
                      placeholder="Diagnosis, differential diagnosis, clinical impression..."
                      className="min-h-[150px]"
                    />
                  </TabsContent>

                  <TabsContent value="plan">
                    <Textarea
                      placeholder="Treatment plan, medications, follow-up instructions..."
                      className="min-h-[150px]"
                    />
                  </TabsContent>
                </Tabs>

                <Button className="mt-4 w-full bg-jeevan-primary hover:bg-jeevan-teal">
                  <FileText className="mr-2 h-5 w-5" />
                  Save SOAP Notes
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pre-consultation Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg text-jeevan-text">Pre-consultation Vitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Blood Pressure</Label>
                  <Input placeholder="120/80 mmHg" />
                </div>
                <div>
                  <Label>Heart Rate</Label>
                  <Input placeholder="72 bpm" />
                </div>
                <div>
                  <Label>Temperature</Label>
                  <Input placeholder="98.6°F" />
                </div>
                <div>
                  <Label>SpO2</Label>
                  <Input placeholder="98%" />
                </div>
                <Button variant="outline" className="w-full">
                  Save Vitals
                </Button>
              </CardContent>
            </Card>

            {/* E-Prescription Generator */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg text-jeevan-text">E-Prescription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Medication</Label>
                  <Input placeholder="Medicine name" />
                </div>
                <div>
                  <Label>Dosage</Label>
                  <Input placeholder="e.g., 500mg" />
                </div>
                <div>
                  <Label>Frequency</Label>
                  <Input placeholder="e.g., Twice daily" />
                </div>
                <div>
                  <Label>Duration</Label>
                  <Input placeholder="e.g., 7 days" />
                </div>
                <Button className="w-full bg-jeevan-teal hover:bg-jeevan-primary">
                  Generate Prescription
                </Button>
              </CardContent>
            </Card>

            {/* Follow-up Scheduling */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg text-jeevan-text">Schedule Follow-up</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Follow-up Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea placeholder="Follow-up instructions..." />
                </div>
                <Button variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Follow-up
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
