const API_BASE_URL = 'https://reported-users-backend-production.up.railway.app';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    users: {
      me: `${API_BASE_URL}/api/Users/me`,
    },
    reportedUsers: {
      base: `${API_BASE_URL}/api/ReportedUsers`,
      search: `${API_BASE_URL}/api/ReportedUsers/search`,
      drafts: `${API_BASE_URL}/api/ReportedUsers/drafts/admin`,
      status: (id: string) => `${API_BASE_URL}/api/ReportedUsers/${id}/status`,
      byId: (id: string) => `${API_BASE_URL}/api/ReportedUsers/${id}`,
    },
    auth: {
      login: `${API_BASE_URL}/api/Auth/login`,
      register: `${API_BASE_URL}/api/Auth/register`,
    },
  },
};