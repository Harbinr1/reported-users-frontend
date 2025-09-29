import { apiConfig } from '../config/apiConfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Shield, Trash2 } from 'lucide-react';
import { ReportedUser } from '@/types/ReportedUsersTypes';
import { TOKEN_KEY } from '@/lib/auth';


interface ReportedUsersTableProps {
  filteredReports: ReportedUser[];
  onUserClick: (userId: string | null) => void;
  onDelete?: (reportId: string | null) => void;
}

const ReportedUsersTable = ({ filteredReports, onUserClick, onDelete }: ReportedUsersTableProps) => {
  const handleDelete = async (reportId: string | null, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!reportId) {
      alert('Cannot delete report without ID');
      return;
    }

    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      const token = localStorage.getItem(TOKEN_KEY);
      
      if (!token) {
        alert('Authentication required. Please log in.');
        return;
      }

      const response = await fetch(apiConfig.endpoints.reportedUsers.byId(reportId), {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Report deleted successfully');
        if (onDelete) {
          onDelete(reportId);
        }
        // Refresh the page or call a callback to refresh data
        window.location.reload();
      } else {
        alert(`Failed to delete report: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
      console.error('Delete error:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow 
                key={report.id || Math.random()}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => onUserClick(report.id)}
              >
                <TableCell>
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-gray-500">ID: {report.idNumber}</p>
                  </div>
                </TableCell>
                <TableCell>{report.idNumber}</TableCell>
                <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                <TableCell>{report.location}</TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="text-sm truncate">{report.description}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={(e) => handleDelete(report.id, e)}
                    disabled={!report.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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
