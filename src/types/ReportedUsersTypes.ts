
export interface ReportedUser {
  id: string | null;
  name: string;
  idNumber: string;
  date: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActionFormData {
  action: string;
  notes: string;
}
