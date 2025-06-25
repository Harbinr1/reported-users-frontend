
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Calendar, Users, Star } from 'lucide-react';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  location: string;
  availability: boolean;
  rating: number;
  imageUrl: string;
  features: string[];
}

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Mock data - this will be replaced with API calls
  const cars: Car[] = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      pricePerDay: 65,
      location: 'New York, NY',
      availability: true,
      rating: 4.5,
      imageUrl: '/placeholder.svg',
      features: ['Automatic', 'AC', 'GPS', 'Bluetooth']
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      year: 2022,
      pricePerDay: 55,
      location: 'Los Angeles, CA',
      availability: true,
      rating: 4.3,
      imageUrl: '/placeholder.svg',
      features: ['Automatic', 'AC', 'Bluetooth']
    },
    {
      id: '3',
      make: 'BMW',
      model: 'X3',
      year: 2023,
      pricePerDay: 120,
      location: 'Miami, FL',
      availability: false,
      rating: 4.8,
      imageUrl: '/placeholder.svg',
      features: ['Automatic', 'AC', 'GPS', 'Bluetooth', 'Leather Seats']
    }
  ];

  const filteredCars = cars.filter(car => 
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Car</h1>
          <p className="text-gray-600">Discover and rent cars from trusted owners in your area</p>
        </div>

        {/* Search Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Cars
            </CardTitle>
            <CardDescription>Filter cars by your preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Car Make/Model</label>
                <Input
                  placeholder="e.g., Toyota, Honda"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  icon={<MapPin className="h-4 w-4" />}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">From Date</label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To Date</label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Car Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200">
                <img
                  src={car.imageUrl}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover"
                />
                {!car.availability && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Badge variant="secondary" className="bg-red-500 text-white">
                      Not Available
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{car.make} {car.model}</h3>
                    <p className="text-gray-600">{car.year}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{car.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{car.location}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {car.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {car.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{car.features.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold">${car.pricePerDay}</span>
                    <span className="text-gray-600">/day</span>
                  </div>
                  <Button 
                    disabled={!car.availability}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {car.availability ? 'Book Now' : 'Unavailable'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
