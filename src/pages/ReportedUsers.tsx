
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Shield, Eye, Ban, CheckCircle, AlertTriangle, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ReportedUser {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  reportedBy: string;
  reportReason: string;
  reportDate: string;
  location: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

const ReportedUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<ReportedUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      action: '',
      notes: '',
    }
  });

  // Mock data - this will be replaced with API calls
  const reportedUsers: ReportedUser[] = [
    {
      id: '1',
      userId: 'user123',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@email.com',
      reportedBy: 'Sarah Smith',
      reportReason: 'Damaged vehicle',
      reportDate: '2024-01-15',
      location: 'New York, NY',
      description: 'Returned the car with significant scratches and refused to acknowledge damage.',
      severity: 'high'
    },
    {
      id: '2',
      userId: 'user456',
      userName: 'Alex Brown',
      userEmail: 'alex.brown@email.com',
      reportedBy: 'John Doe',
      reportReason: 'Late return',
      reportDate: '2024-01-14',
      location: 'Los Angeles, CA',
      description: 'Consistently returns vehicles late without prior notification.',
      severity: 'medium'
    },
    {
      id: '3',
      userId: 'user789',
      userName: 'Emma Wilson',
      userEmail: 'emma.wilson@email.com',
      reportedBy: 'Car Owner Co.',
      reportReason: 'No-show',
      reportDate: '2024-01-13',
      location: 'Chicago, IL',
      description: 'Failed to show up for reserved rental without cancellation.',
      severity: 'low'
    }
  ];

  const filteredReports = reportedUsers.filter(report =>
    report.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reportReason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="outline" className="border-orange-500 text-orange-700">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="border-gray-500 text-gray-700">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleViewReport = (report: ReportedUser) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleTakeAction = (values: any) => {
    console.log('Taking action:', values);
    // API call would go here
    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Reported Users</h1>
          </div>
          <p className="text-gray-600">Manage and review user reports to maintain platform safety</p>
        </div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {reportedUsers.length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">High Priority</p>
                  <p className="text-2xl font-bold text-red-600">
                    {reportedUsers.filter(r => r.severity === 'high').length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Reports</CardTitle>
            <CardDescription>
              Review and take action on reported users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{report.userName}</p>
                        <p className="text-sm text-gray-500">{report.userEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{report.reportedBy}</TableCell>
                    <TableCell>{report.reportReason}</TableCell>
                    <TableCell>{report.reportDate}</TableCell>
                    <TableCell>{report.location}</TableCell>
                    <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredReports.length === 0 && (
              <div className="text-center py-8">
                <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-600">No user reports match your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Report Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Report Details</DialogTitle>
              <DialogDescription>
                Review the report and take appropriate action
              </DialogDescription>
            </DialogHeader>

            {selectedReport && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reported User</label>
                    <p className="text-sm">{selectedReport.userName}</p>
                    <p className="text-xs text-gray-500">{selectedReport.userEmail}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reported By</label>
                    <p className="text-sm">{selectedReport.reportedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Reason</label>
                    <p className="text-sm">{selectedReport.reportReason}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <p className="text-sm">{selectedReport.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Severity</label>
                    <div className="mt-1">{getSeverityBadge(selectedReport.severity)}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">{selectedReport.description}</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleTakeAction)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="action"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Action to Take</FormLabel>
                          <FormControl>
                            <select {...field} className="w-full px-3 py-2 border border-gray-300 rounded-md">
                              <option value="">Select an action</option>
                              <option value="warning">Issue Warning</option>
                              <option value="suspend">Suspend Account</option>
                              <option value="ban">Ban User</option>
                              <option value="dismiss">Dismiss Report</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Action Notes</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add notes about the action taken..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Take Action</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReportedUsers;
