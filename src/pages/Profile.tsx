
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Mail } from 'lucide-react';

const Profile = () => {
  const userInfo = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    bio: 'Car enthusiast and responsible renter. Love exploring new places with reliable vehicles.',
  };

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
                JD
              </div>
              <h3 className="text-xl font-semibold mb-1">John Doe</h3>
              <p className="text-gray-600 mb-2">john.doe@email.com</p>
              <Badge variant="outline" className="mb-4">Verified User</Badge>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>Member since Jan 2023</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span>5 rentals completed</span>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
                    <Input value={userInfo.firstName} disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
                    <Input value={userInfo.lastName} disabled />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                  <Input value={userInfo.email} type="email" disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
                  <Input value={userInfo.phone} disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
                  <Input value={userInfo.address} disabled />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Bio</label>
                  <Textarea
                    value={userInfo.bio}
                    disabled
                    rows={3}
                  />
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
