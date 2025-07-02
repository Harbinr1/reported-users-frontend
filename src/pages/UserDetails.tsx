
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, AlertTriangle, Shield } from 'lucide-react';

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

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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
      location: 'New York, NY',
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
      location: 'Los Angeles, CA',
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
      location: 'Chicago, IL',
      description: 'Failed to show up for reserved rental without cancellation.',
      severity: 'low'
    }
  ];

  const user = reportedUsers.find(u => u.id === id);

  if (!user) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">User Not Found</h2>
            <p className="text-gray-600">The requested user could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          </div>
          <p className="text-gray-600">Detailed information about reported user</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user.userName.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-xl font-semibold mb-1">{user.userName}</h3>
              <p className="text-gray-600 mb-2">ID: {user.userId}</p>
              <Badge variant="outline" className="mb-4">Reported User</Badge>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{user.userEmail}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Report Information
                {getSeverityBadge(user.severity)}
              </CardTitle>
              <CardDescription>Details about the reported incident</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Reported By
                    </label>
                    <p className="text-sm text-gray-900">{user.reportedBy}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Report Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-900">{user.reportDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Report Reason
                    </label>
                    <p className="text-sm text-gray-900">{user.reportReason}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Severity Level
                    </label>
                    <div className="mt-1">{getSeverityBadge(user.severity)}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Detailed Description
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{user.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex gap-3">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Shield className="h-4 w-4 mr-2" />
                      Take Action
                    </Button>
                    <Button variant="outline">
                      Contact User
                    </Button>
                    <Button variant="outline">
                      View History
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
