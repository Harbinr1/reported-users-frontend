import { apiConfig } from '../config/apiConfig';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Settings, Calendar } from 'lucide-react';
import { getToken } from '@/lib/auth'; // ✅ Changed from TOKEN_KEY to getToken

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
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

      const response = await fetch(apiConfig.endpoints.users.me, {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setError(`Failed to fetch profile: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchUserProfile}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">View your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Picture & Basic Info */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </div>
              <h3 className="text-xl font-semibold mb-1">{user?.name || 'Not provided'}</h3>
              <p className="text-gray-600 mb-2">{user?.email || 'Not provided'}</p>
              <Badge variant="outline" className="mb-4">Verified User</Badge>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>Shield Watch User</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                  <Input value={user?.name || ''} disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                  <Input value={user?.email || ''} type="email" disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
                  <Input value={user?.phoneNumber || ''} disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
                  <Input value={user?.address || ''} disabled />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;