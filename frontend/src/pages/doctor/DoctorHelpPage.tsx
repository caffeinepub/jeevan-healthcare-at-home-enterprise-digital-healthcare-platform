import { BookOpen, AlertCircle, MessageSquare, FileText, Shield, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DoctorHelpPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-jeevan-text">Help & Support</h1>
          <p className="mt-2 text-gray-600">Training materials, compliance, and support resources</p>
        </div>

        {/* Quick Links */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="rounded-full bg-jeevan-primary/10 p-4 mb-4">
                <BookOpen className="h-8 w-8 text-jeevan-primary" />
              </div>
              <h3 className="font-semibold text-jeevan-text mb-2">Training Materials</h3>
              <p className="text-sm text-gray-600">Access guides and tutorials</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="rounded-full bg-jeevan-teal/10 p-4 mb-4">
                <Shield className="h-8 w-8 text-jeevan-teal" />
              </div>
              <h3 className="font-semibold text-jeevan-text mb-2">Compliance</h3>
              <p className="text-sm text-gray-600">Healthcare safety standards</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="rounded-full bg-yellow-500/10 p-4 mb-4">
                <MessageSquare className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="font-semibold text-jeevan-text mb-2">Support Tickets</h3>
              <p className="text-sm text-gray-600">Get help from our team</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-jeevan-text">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I start a teleconsultation?</AccordionTrigger>
                <AccordionContent>
                  Navigate to the Consultations page and click "Start Video" or "Audio Only" to begin a consultation with your patient. Ensure your camera and microphone permissions are enabled.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I generate an e-prescription?</AccordionTrigger>
                <AccordionContent>
                  During or after a consultation, use the E-Prescription Generator in the sidebar. Fill in medication details, dosage, frequency, and duration, then click "Generate Prescription" to create a digital prescription for your patient.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How are my earnings calculated?</AccordionTrigger>
                <AccordionContent>
                  Your earnings are calculated based on completed consultations. Each consultation fee is tracked in the Payments & Earnings section. Payments are processed according to your agreement with Jeevan HealthCare.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>What are SOAP notes?</AccordionTrigger>
                <AccordionContent>
                  SOAP notes (Subjective, Objective, Assessment, Plan) are a standardized method for documenting patient consultations. They help maintain comprehensive medical records and ensure quality care.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>How do I update my availability?</AccordionTrigger>
                <AccordionContent>
                  Go to Profile & Settings, then the Availability tab. You can set your working hours for each day of the week. This helps patients book appointments during your available times.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Compliance Reminders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-heading text-xl text-jeevan-text">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Compliance Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border-l-4 border-l-yellow-500 bg-yellow-50 p-4">
                <p className="font-medium text-gray-900">Patient Confidentiality</p>
                <p className="mt-1 text-sm text-gray-700">
                  Always maintain patient confidentiality and follow HIPAA guidelines. Do not share patient information without proper authorization.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-l-blue-500 bg-blue-50 p-4">
                <p className="font-medium text-gray-900">Documentation Standards</p>
                <p className="mt-1 text-sm text-gray-700">
                  Complete SOAP notes for every consultation. Proper documentation is essential for quality care and legal compliance.
                </p>
              </div>

              <div className="rounded-lg border-l-4 border-l-green-500 bg-green-50 p-4">
                <p className="font-medium text-gray-900">Prescription Guidelines</p>
                <p className="mt-1 text-sm text-gray-700">
                  Follow proper prescription protocols. Include complete medication information, dosage, and duration. Verify patient allergies before prescribing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Ticket Form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl text-jeevan-text">Submit a Support Ticket</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Brief description of your issue" />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                <option>Technical Issue</option>
                <option>Account Question</option>
                <option>Payment Inquiry</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Provide detailed information about your issue..." className="min-h-[150px]" />
            </div>
            <Button className="w-full bg-jeevan-primary hover:bg-jeevan-teal">
              Submit Ticket
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
