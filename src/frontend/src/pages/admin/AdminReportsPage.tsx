import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminReportsPage() {
  const mockReports = [
    { id: 'RPT-001', patient: 'Ramesh Kumar', test: 'Complete Blood Count', status: 'verified', date: '2025-01-25' },
    { id: 'RPT-002', patient: 'Lakshmi Devi', test: 'Lipid Profile', status: 'pending', date: '2025-01-26' },
    { id: 'RPT-003', patient: 'Srinivas Rao', test: 'Thyroid Profile', status: 'verified', date: '2025-01-24' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-jeevan-primary">Reports Management</h1>
          <p className="mt-2 text-gray-600">Upload, verify, and manage test reports</p>
        </div>
        <Button className="bg-jeevan-primary hover:bg-jeevan-accent">
          <Upload className="mr-2 h-4 w-4" />
          Upload Report
        </Button>
      </div>

      <div className="space-y-4">
        {mockReports.map((report) => (
          <Card key={report.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <FileText className="mt-1 h-5 w-5 text-jeevan-primary" />
                  <div>
                    <CardTitle className="text-lg">{report.id}</CardTitle>
                    <p className="mt-1 text-sm text-gray-600">Patient: {report.patient}</p>
                  </div>
                </div>
                <Badge variant={report.status === 'verified' ? 'default' : 'secondary'}>
                  {report.status === 'verified' ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </>
                  ) : (
                    <>
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{report.test}</p>
                  <p className="text-xs text-gray-500">Date: {report.date}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  {report.status === 'pending' && (
                    <Button size="sm" className="bg-jeevan-primary hover:bg-jeevan-accent">
                      Verify
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
