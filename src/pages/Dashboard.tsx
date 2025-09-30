import { apiConfig } from '../config/apiConfig';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, Eye, Ban, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getToken } from '@/lib/auth'; // ✅ Added getToken import

interface ReportedUser {
  id: string | null;
  name: string;
  date: string;
  idNumber: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [reportedUsers, setReportedUsers] = useState<ReportedUser[]>([]);
  const navigate = useNavigate();

  // Load saved state from sessionStorage on component mount
  useEffect(() => {
    const savedSearchTerm = sessionStorage.getItem('dashboardSearchTerm');
    const savedHasSearched = sessionStorage.getItem('dashboardHasSearched');

    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }

    if (savedHasSearched === 'true') {
      setHasSearched(true);
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('dashboardSearchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    sessionStorage.setItem('dashboardHasSearched', hasSearched.toString());
  }, [hasSearched]);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      // ✅ FIXED: Using getToken() instead of localStorage.getItem("auth_token")
      const token = getToken();
      const res = await fetch(`${apiConfig.endpoints.reportedUsers.search}?NameOrIdNumber=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setReportedUsers(Array.isArray(data) ? data : [data]);
      setHasSearched(true);
    } catch (err) {
      setReportedUsers([]);
      setHasSearched(true);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (id: string | null) => {
    return id ? <Badge variant="outline">Active</Badge> : <Badge variant="destructive">Pending</Badge>;
  };

  const handleUserClick = (userId: string | null) => {
    if (userId) navigate(`/user/${userId}`);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <Link to="/add-reported-user">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Reported User
              </Button>
            </Link>
          </div>
          <p className="text-gray-600">Search and manage reported users</p>
        </div>

        {/* Search Interface */}
        <div className={`transition-all duration-700 ease-in-out ${hasSearched ? 'transform -translate-y-4' : ''
          }`}>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Users
              </CardTitle>
              <CardDescription>Search for reported users by name or ID number</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or ID number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    disabled={isSearching}
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  ) : (
                    <Search className="h-4 w-4 mr-2" />
                  )}
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading state */}
        {isSearching && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* Results Table - Only shown after search with smooth animation */}
        {hasSearched && !isSearching && (
          <div className="animate-fade-in">
            <Card className={`transition-all duration-700 ease-out transform ${hasSearched ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              } bg-white border-0 shadow-lg`}>
              <CardHeader>
                <CardTitle>Reported Users</CardTitle>
              </CardHeader>
              <CardContent>
                {reportedUsers.length > 0 ? (
                  <div className="animate-slide-in-from-bottom">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>ID Number</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportedUsers.map((user, index) => (
                          <TableRow
                            key={user.id ?? index}
                            className={`animate-fade-in opacity-0 cursor-pointer hover:bg-gray-50`}
                            style={{
                              animationDelay: `${index * 150}ms`,
                              animationFillMode: 'forwards'
                            }}
                            onClick={() => handleUserClick(user.id)}
                          >
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.idNumber}</TableCell>
                            <TableCell>{new Date(user.date).toLocaleDateString()}</TableCell>
                            <TableCell>{user.location}</TableCell>
                            <TableCell>
                              <div className="max-w-xs">
                                <p className="text-sm truncate">{user.description}</p>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(user.id)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 animate-fade-in">
                    <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-600">No reported users match your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;