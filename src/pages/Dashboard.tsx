
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Eye, Ban } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ReportedUser {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  reportedBy: string;
  reportReason: string;
  reportDate: string;
  status: 'pending' | 'reviewed' | 'action_taken';
  description: string;
  severity: 'low' | 'medium' | 'high';
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Mock data - this will be replaced with API calls
  const reportedUsers: ReportedUser[] = [
    {
      id: '1',
      userId: 'MJ001',
      userName: 'Mike Johnson',
      userEmail: 'mike.johnson@email.com',
      reportedBy: 'Sarah Smith',
      reportReason: 'Damaged vehicle',
      reportDate: '2024-01-15',
      status: 'pending',
      description: 'Returned the car with significant scratches and refused to acknowledge damage.',
      severity: 'high'
    },
    {
      id: '2',
      userId: 'AB002',
      userName: 'Alex Brown',
      userEmail: 'alex.brown@email.com',
      reportedBy: 'John Doe',
      reportReason: 'Late return',
      reportDate: '2024-01-14',
      status: 'reviewed',
      description: 'Consistently returns vehicles late without prior notification.',
      severity: 'medium'
    },
    {
      id: '3',
      userId: 'EW003',
      userName: 'Emma Wilson',
      userEmail: 'emma.wilson@email.com',
      reportedBy: 'Car Owner Co.',
      reportReason: 'No-show',
      reportDate: '2024-01-13',
      status: 'action_taken',
      description: 'Failed to show up for reserved rental without cancellation.',
      severity: 'low'
    }
  ];

  const filteredUsers = reportedUsers.filter(user => 
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    setHasSearched(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Pending</Badge>;
      case 'reviewed':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Reviewed</Badge>;
      case 'action_taken':
        return <Badge variant="outline" className="border-green-500 text-green-700">Action Taken</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <p className="text-gray-600">Search and manage reported users</p>
        </div>

        {/* Search Interface */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Users
            </CardTitle>
            <CardDescription>Search for reported users by initials, ID, or location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by initials, id or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Table - Only shown after search */}
        {hasSearched && (
          <Card>
            <CardHeader>
              <CardTitle>Reported Users</CardTitle>
              <CardDescription>
                {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredUsers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono">{user.userId}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.userName}</p>
                            <p className="text-sm text-gray-500">{user.userEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{user.reportedBy}</TableCell>
                        <TableCell>{user.reportReason}</TableCell>
                        <TableCell>{user.reportDate}</TableCell>
                        <TableCell>{getSeverityBadge(user.severity)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {user.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Ban className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                  <p className="text-gray-600">No reported users match your search criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
