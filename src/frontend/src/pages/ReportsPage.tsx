import { Download, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockReports = [
  {
    id: 'RPT-001',
    orderId: 'ORD-2025-002',
    date: '2025-01-22',
    tests: ['Thyroid Profile', 'HbA1c'],
    status: 'verified',
  },
  {
    id: 'RPT-002',
    orderId: 'ORD-2025-003',
    date: '2025-01-17',
    tests: ['Basic Health Checkup Package'],
    status: 'verified',
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-jeevan-primary">My Reports</h1>
          <p className="mt-2 text-gray-600">Download your test reports</p>
        </div>

        <div className="space-y-4">
          {mockReports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{report.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Order: {report.orderId} | Date: {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {report.tests.map((test, idx) => (
                      <Badge key={idx} variant="secondary">
                        {test}
                      </Badge>
                    ))}
                  </div>
                  <Button className="bg-jeevan-primary hover:bg-jeevan-accent">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
