
import { ReportedUser } from '@/types/ReportedUsersTypes';

export const mockReportedUsers: ReportedUser[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    idNumber: 'ID123456789',
    date: '2024-01-15T10:30:00Z',
    location: 'New York, NY',
    description: 'Returned the car with significant scratches and refused to acknowledge damage.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Alex Brown',
    idNumber: 'ID987654321',
    date: '2024-01-14T14:15:00Z',
    location: 'Los Angeles, CA',
    description: 'Consistently returns vehicles late without prior notification.',
    createdAt: '2024-01-14T14:15:00Z',
    updatedAt: '2024-01-14T14:15:00Z'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    idNumber: 'ID456789123',
    date: '2024-01-13T09:45:00Z',
    location: 'Chicago, IL',
    description: 'Failed to show up for reserved rental without cancellation.',
    createdAt: '2024-01-13T09:45:00Z',
    updatedAt: '2024-01-13T09:45:00Z'
  }
];

export const filterReports = (reports: ReportedUser[], searchTerm: string): ReportedUser[] => {
  return reports.filter(report =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.idNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
