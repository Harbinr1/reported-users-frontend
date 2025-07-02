
import { ReportedUser } from '@/types/ReportedUsersTypes';

export const mockReportedUsers: ReportedUser[] = [
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

export const filterReports = (reports: ReportedUser[], searchTerm: string): ReportedUser[] => {
  return reports.filter(report =>
    report.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reportReason.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
