
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Shield, Eye, Ban } from 'lucide-react';
import { ReportedUser } from '@/types/ReportedUsersTypes';

interface ReportedUsersTableProps {
  filteredReports: ReportedUser[];
  onViewReport: (report: ReportedUser) => void;
  onUserClick: (userId: string) => void;
}

const ReportedUsersTable = ({ filteredReports, onViewReport, onUserClick }: ReportedUsersTableProps) => {
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

  return (
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
              <TableRow 
                key={report.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onUserClick(report.id)}
              >
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
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewReport(report);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={(e) => e.stopPropagation()}
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
  );
};

export default ReportedUsersTable;
