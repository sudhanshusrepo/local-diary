
import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { ServiceProvider } from '../../types';
import { StarIcon } from '../icons/StarIcon';
import { Button } from '../ui/Button';
import Header from '../Header';

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Alice Johnson', profile: 'Electrician', avatar: 'https://picsum.photos/seed/alice/200', distance: 1.2, rating: 4.8 },
  { id: '2', name: 'Ben Carter', profile: 'Plumber', avatar: 'https://picsum.photos/seed/ben/200', distance: 2.5, rating: 4.9 },
  { id: '3', name: 'Chloe Davis', profile: 'Private Tutor (Math)', avatar: 'https://picsum.photos/seed/chloe/200', distance: 3.1, rating: 5.0 },
  { id: '4', name: 'David Evans', profile: 'Barber', avatar: 'https://picsum.photos/seed/david/200', distance: 4.0, rating: 4.7 },
  { id: '5', name: 'Eva Williams', profile: 'Car Wash Service', avatar: 'https://picsum.photos/seed/eva/200', distance: 5.5, rating: 4.6 },
  { id: '6', name: 'Frank Green', profile: 'Bike Wash', avatar: 'https://picsum.photos/seed/frank/200', distance: 6.1, rating: 4.8 },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="w-5 h-5 text-yellow-400" />)}
      {halfStar && <StarIcon key="half" className="w-5 h-5 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
      {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="w-5 h-5 text-slate-600" />)}
      <span className="ml-2 text-sm text-slate-400">{rating.toFixed(1)}</span>
    </div>
  );
};

interface PublicSearchPageProps {
  onLoginClick: () => void;
  onNavigate: (page: 'landing' | 'search' | 'blogs') => void;
}

const PublicSearchPage: React.FC<PublicSearchPageProps> = ({ onLoginClick, onNavigate }) => {
  const [locationStatus, setLocationStatus] = useState('Checking location...');
  const [searchResults, setSearchResults] = useState<ServiceProvider[]>([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser. Showing general results.");
      setSearchResults(mockProviders);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus(`Showing results near you.`);
        setSearchResults(mockProviders);
      },
      (error) => {
        let errorMessage = 'Could not retrieve location. Showing general results.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable it in your browser settings to see nearby results.";
            break;
        }
        setLocationStatus(errorMessage);
        setSearchResults(mockProviders);
      },
      { timeout: 10000 }
    );
  }, []);

  return (
     <div className="relative min-h-screen bg-brand-dark">
      <Header onLoginClick={onLoginClick} onNavigate={onNavigate} />
       <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-4">
                Find a <span className="bg-clip-text text-transparent bg-gradient-primary">Professional</span>
            </h1>
            <div className="relative mb-4 max-w-xl mx-auto">
                <input 
                type="text" 
                placeholder="Search for a service..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
            <p className="text-sm text-slate-400 mb-8 text-center">{locationStatus}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(provider => (
                    <div key={provider.id} className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700 flex flex-col text-left space-y-3 transition-all hover:border-brand-primary hover:shadow-brand-primary/20 hover:-translate-y-1">
                        <div className="flex items-center space-x-4">
                            <img src={provider.avatar} alt={provider.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-primary" />
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white">{provider.name}</h3>
                                <p className="text-brand-primary font-medium text-sm">{provider.profile}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                            <StarRating rating={provider.rating} />
                            <p className="text-sm text-slate-400">{provider.distance} km away</p>
                        </div>
                        <Button variant="secondary" className="w-full !mt-4">View Profile</Button>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default PublicSearchPage;
