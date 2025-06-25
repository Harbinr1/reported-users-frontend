
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const location = useLocation();
  const isAdmin = true; // This will come from auth context

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Car },
    { path: '/reported-users', label: 'Reported Users', icon: Shield, adminOnly: true },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin);

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
                        {item.label === 'Reported Users' && (
                          <Badge variant="destructive" className="ml-auto">
                            3
                          </Badge>
                        )}
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
            <span className="text-white text-sm font-medium">JD</span>
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">{isAdmin ? 'Admin' : 'User'}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
