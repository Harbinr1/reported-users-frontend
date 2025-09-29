const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://localhost:7040';
const AUTH_API_BASE_URL = process.env.REACT_APP_AUTH_API_BASE_URL || 'http://localhost:5221';

export const apiConfig = {
  baseURL: API_BASE_URL,
  authBaseURL: AUTH_API_BASE_URL,
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
      login: `${AUTH_API_BASE_URL}/api/Auth/login`,
    },
  },
};