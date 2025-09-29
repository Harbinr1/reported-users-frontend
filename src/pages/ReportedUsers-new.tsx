import { apiConfig } from '../config/apiConfig';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { ReportedUser, ActionFormData } from '@/types/ReportedUsersTypes';
import ReportedUsersStats from '@/components/ReportedUsersStats';
import ReportedUsersTable from '@/components/ReportedUsersTable';
import ReportedUsersDialog from '@/components/ReportedUsersDialog';
import { TOKEN_KEY } from '@/lib/auth';

const ReportedUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<ReportedUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reportedUsers, setReportedUsers] = useState<ReportedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchReportedUsers();
  }, []);

  const fetchReportedUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }

      const response = await fetch(apiConfig.endpoints.reportedUsers.base, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReportedUsers(Array.isArray(data) ? data : []);
      } else {
        setError(`Failed to fetch reported users: ${response.status} ${response.statusText}`);
        console.error('API Error:', response.statusText);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Network error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reportedUsers.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewReport = (report: ReportedUser) => {
    navigate(`/user/${report.id}`);
  };

  const handleUserClick = (userId: string | null) => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
  };

  const handleTakeAction = (values: ActionFormData) => {
    console.log('Taking action:', values);
    // API call would go here
    setIsDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading reported users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={fetchReportedUsers}
              className="mt-2 text-red-600 underline hover:text-red-700"
            >
              Try again
            </button>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Reported Users</h1>
          </div>
          <p className="text-gray-600">Manage and review user reports to maintain platform safety</p>
        </div>

        <ReportedUsersStats
          reportedUsers={reportedUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ReportedUsersTable
          filteredReports={filteredReports}
          onUserClick={handleUserClick}
        />

        <ReportedUsersDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          selectedReport={selectedReport}
        />
      </div>
    </div>
  );
};

export default ReportedUsers;
