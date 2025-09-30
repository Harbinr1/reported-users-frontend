import React, { useState, useEffect } from 'react';
import { apiConfig } from '../config/apiConfig';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getToken } from '@/lib/auth'; // Keep this import
import {
  Car,
  Shield,
  User,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { signOut } from '@/lib/auth';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  isAdmin?: boolean;
}

const AppSidebar = () => {
  const location = useLocation();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // ✅ FIXED: Remove duplicate token declaration and use getToken()
      const token = getToken();

      if (!token) {
        console.log('No token found, user might not be logged in');
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
        localStorage.setItem('user', JSON.stringify(data));
      } else {
        console.error('Failed to fetch user profile:', response.status);
        // If unauthorized, redirect to login
        if (response.status === 401) {
          signOut();
        }
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Car },
    { path: '/reported-users', label: 'Reported Users', icon: Shield },
    { path: '/manager-dashboard', label: 'Manager', icon: Shield, adminOnly: true },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const filteredNavItems = navItems.filter(item => !item.adminOnly || user?.isAdmin);

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Car className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">CarRental</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path} className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
            </span>
          </div>
          <div>
            <p className="font-medium">{user?.name || 'Loading...'}</p>
            {user?.isAdmin && (
              <p className="text-sm text-gray-500">Admin</p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;