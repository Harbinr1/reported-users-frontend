
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { mockReportedUsers, filterReports } from '@/data/ReportedUsersData';
import { ReportedUser, ActionFormData } from '@/types/ReportedUsersTypes';
import ReportedUsersStats from '@/components/ReportedUsersStats';
import ReportedUsersTable from '@/components/ReportedUsersTable';
import ReportedUsersDialog from '@/components/ReportedUsersDialog';

const ReportedUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<ReportedUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredReports = filterReports(mockReportedUsers, searchTerm);

  const handleViewReport = (report: ReportedUser) => {
    navigate(`/user/${report.id}`);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const handleTakeAction = (values: ActionFormData) => {
    console.log('Taking action:', values);
    // API call would go here
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Reported Users</h1>
          </div>
          <p className="text-gray-600">Manage and review user reports to maintain platform safety</p>
        </div>

        <ReportedUsersStats
          reportedUsers={mockReportedUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ReportedUsersTable
          filteredReports={filteredReports}
          onViewReport={handleViewReport}
          onUserClick={handleUserClick}
        />

        <ReportedUsersDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          selectedReport={selectedReport}
          onTakeAction={handleTakeAction}
        />
      </div>
    </div>
  );
};

export default ReportedUsers;
