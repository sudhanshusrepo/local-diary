import React, { useState, useEffect, useMemo } from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { ServiceProvider } from '../../../shared/types';
import { StarIcon } from '../icons/StarIcon';
import { Button } from '../ui/Button';
import Header from '../Header';
import { useGeolocation } from '../../hooks/useGeolocation';

// Fix: Add missing 'bio' and 'reviews' properties to each provider to match the ServiceProvider type.
const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Alice Johnson', profile: 'Electrician', avatar: 'https://picsum.photos/seed/alice/200', distance: 1.2, rating: 4.8, bio: "Certified electrician with over 10 years of experience in residential and commercial wiring. I pride myself on being punctual, clean, and efficient.", reviews: ["Alice was fantastic! She arrived on time and fixed my lighting issue in no time.", "Very professional and knowledgeable. Left the workspace cleaner than she found it.", "A bit pricey, but the quality of work is worth it."] },
  { id: '2', name: 'Ben Carter', profile: 'Plumber', avatar: 'https://picsum.photos/seed/ben/200', distance: 2.5, rating: 4.9, bio: "Your go-to plumber for everything from leaky faucets to full bathroom renovations. Available 24/7 for emergencies.", reviews: ["Ben saved us during a midnight plumbing emergency. Can't thank him enough!", "Extremely reliable and honest. His quote was fair and the work was top-notch.", "He explained everything clearly and was very patient with my questions."] },
  { id: '3', name: 'Chloe Davis', profile: 'Private Tutor (Math)', avatar: 'https://picsum.photos/seed/chloe/200', distance: 3.1, rating: 5.0, bio: "Patient and experienced math tutor specializing in high school algebra and calculus. I make learning fun and accessible.", reviews: ["Chloe is a miracle worker! My son's grades improved dramatically after just a few sessions.", "She has a real gift for teaching. Highly recommended!", "Always positive and encouraging."] },
  { id: '4', name: 'David Evans', profile: 'Barber', avatar: 'https://picsum.photos/seed/david/200', distance: 4.0, rating: 4.7, bio: "Classic and modern cuts in a relaxed atmosphere. Expert in fades, beard trims, and hot towel shaves.", reviews: ["Best fade I've had in the city. David pays great attention to detail.", "Super cool guy and a great barber. The shop has a great vibe.", "Sometimes runs a little behind schedule, but always worth the wait."] },
  { id: '5', name: 'Eva Williams', profile: 'Car Wash Service', avatar: 'https://picsum.photos/seed/eva/200', distance: 5.5, rating: 4.6, bio: "Mobile car detailing service. We come to you with our own water and power. Eco-friendly products used.", reviews: ["My car looks brand new! Incredible attention to detail.", "So convenient that they come to your home or office.", "Did a good job, but missed a few spots on the interior."] },
  { id: '6', name: 'Frank Green', profile: 'Bike Wash', avatar: 'https://picsum.photos/seed/frank/200', distance: 6.1, rating: 4.8, bio: "Quick and thorough bike washes to make your ride shine. We handle all types of bikes, from mountain to road bikes.", reviews: ["My bike has never been cleaner. Frank did an amazing job.", "Fast, friendly, and affordable service. Highly recommend.", "Great service, my bike looks like new."] },
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
  const geolocationOptions = useMemo<PositionOptions>(() => ({ timeout: 10000 }), []);
  const { status, errorMessage, getPosition } = useGeolocation(geolocationOptions);
  const [searchResults, setSearchResults] = useState<ServiceProvider[]>([]);

  useEffect(() => {
    getPosition();
  }, [getPosition]);
  
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      setSearchResults(mockProviders);
    } else {
      setSearchResults([]);
    }
  }, [status]);


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
            
            <div className="text-center mb-8">
              <p className="text-sm text-slate-400 min-h-[20px]">{errorMessage}</p>
              {status === 'error' && (
                <Button variant="ghost" className="text-brand-primary !py-1 !px-2 mt-1" onClick={getPosition}>
                  Try Again
                </Button>
              )}
            </div>

            {status === 'pending' && (
              <div className="flex justify-center items-center py-10">
                <div className="w-8 h-8 border-4 border-slate-600 border-t-brand-primary rounded-full animate-spin"></div>
              </div>
            )}

            {searchResults.length > 0 && (
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
            )}
        </div>
      </main>
    </div>
  );
};

export default PublicSearchPage;
