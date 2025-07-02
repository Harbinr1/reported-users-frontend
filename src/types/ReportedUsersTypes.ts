
export interface ReportedUser {
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

export interface ActionFormData {
  action: string;
  notes: string;
}
