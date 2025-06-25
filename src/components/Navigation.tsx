
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Shield, 
  User, 
  LogOut, 
  Menu,
  Bell
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const isAdmin = true; // This will come from auth context

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Car },
    { path: '/reported-users', label: 'Reported Users', icon: Shield, adminOnly: true },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const filteredNavItems = navItems.filter(item => !item.adminOnly || isAdmin);

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-4 border-b">
        <Car className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold">CarRental</span>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {item.label === 'Reported Users' && (
                    <Badge variant="destructive" className="ml-auto">
                      3
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
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
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40">
        <NavContent />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-blue-600" />
          <span className="text-lg font-bold">CarRental</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile top spacing */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};

export default Navigation;
