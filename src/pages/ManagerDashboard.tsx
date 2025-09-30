import { apiConfig } from '../config/apiConfig';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getToken } from '@/lib/auth'; // ✅ Changed from TOKEN_KEY to getToken

interface ReportedUser {
  id: string;
  name: string;
  idNumber: string;
  date: string;
  location: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ManagerDashboard = () => {
  const [drafts, setDrafts] = useState<ReportedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    setLoading(true);
    setError('');
    try {
      // ✅ FIXED: Using getToken() instead of localStorage.getItem(TOKEN_KEY)
      const token = getToken();
      if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }
      const response = await fetch(apiConfig.endpoints.reportedUsers.drafts, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDrafts(Array.isArray(data) ? data : []);
      } else {
        setError(`Failed to fetch drafts: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) return;
    try {
      // ✅ FIXED: Using getToken() instead of localStorage.getItem(TOKEN_KEY)
      const token = getToken();
      if (!token) {
        alert('Authentication required. Please log in.');
        return;
      }
      const response = await fetch(apiConfig.endpoints.reportedUsers.byId(id), {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setDrafts(drafts.filter(d => d.id !== id));
      } else {
        alert(`Failed to delete draft: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
    }
  };

  const handleUpdateStatus = async (id: string) => {
    try {
      // ✅ FIXED: Using getToken() instead of localStorage.getItem(TOKEN_KEY)
      const token = getToken();
      if (!token) {
        alert('Authentication required. Please log in.');
        return;
      }
      const response = await fetch(apiConfig.endpoints.reportedUsers.status(id), {
        method: 'PUT',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: 1 })
      });
      if (response.ok) {
        setDrafts(drafts.map(d => d.id === id ? { ...d, status: '1' } : d));
      } else {
        alert(`Failed to update status: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      alert('Network error. Please check your connection and try again.');
    }
  };

  // Only show if user is admin
  const isAdmin = JSON.parse(localStorage.getItem('user') || '{}').isAdmin;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Manager</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading drafts...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>ID Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drafts.map((draft) => (
                    <TableRow key={draft.id}>
                      <TableCell>{draft.name}</TableCell>
                      <TableCell>{draft.idNumber}</TableCell>
                      <TableCell>{new Date(draft.date).toLocaleDateString()}</TableCell>
                      <TableCell>{draft.location}</TableCell>
                      <TableCell>{draft.description}</TableCell>
                      <TableCell>{draft.status}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                            onClick={() => handleUpdateStatus(draft.id)}
                          >
                            Activate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(draft.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerDashboard;