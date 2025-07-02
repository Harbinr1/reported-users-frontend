
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Shield, Search } from 'lucide-react';
import { ReportedUser } from '@/types/ReportedUsersTypes';

interface ReportedUsersStatsProps {
  reportedUsers: ReportedUser[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ReportedUsersStats = ({ reportedUsers, searchTerm, setSearchTerm }: ReportedUsersStatsProps) => {
  return (
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
  );
};

export default ReportedUsersStats;
