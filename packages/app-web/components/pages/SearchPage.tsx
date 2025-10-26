import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../icons/SearchIcon';
import { ServiceProvider } from '../../../shared/types';
import { StarIcon } from '../icons/StarIcon';
import { Button } from '../ui/Button';
import { generateProfileSummary, ProfileSummary } from '../../../shared/services/geminiService';
import { SparklesIcon } from '../icons/SparklesIcon';
import { CloseIcon } from '../icons/CloseIcon';
import { useGeolocation } from '../../hooks/useGeolocation';

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Alice Johnson', profile: 'Electrician', avatar: 'https://picsum.photos/seed/alice/200', distance: 1.2, rating: 4.8, bio: "Certified electrician with over 10 years of experience in residential and commercial wiring. I pride myself on being punctual, clean, and efficient.", reviews: ["Alice was fantastic! She arrived on time and fixed my lighting issue in no time.", "Very professional and knowledgeable. Left the workspace cleaner than she found it.", "A bit pricey, but the quality of work is worth it."] },
  { id: '2', name: 'Ben Carter', profile: 'Plumber', avatar: 'https://picsum.photos/seed/ben/200', distance: 2.5, rating: 4.9, bio: "Your go-to plumber for everything from leaky faucets to full bathroom renovations. Available 24/7 for emergencies.", reviews: ["Ben saved us during a midnight plumbing emergency. Can't thank him enough!", "Extremely reliable and honest. His quote was fair and the work was top-notch.", "He explained everything clearly and was very patient with my questions."] },
  { id: '3', name: 'Chloe Davis', profile: 'Private Tutor (Math)', avatar: 'https://picsum.photos/seed/chloe/200', distance: 3.1, rating: 5.0, bio: "Patient and experienced math tutor specializing in high school algebra and calculus. I make learning fun and accessible.", reviews: ["Chloe is a miracle worker! My son's grades improved dramatically after just a few sessions.", "She has a real gift for teaching. Highly recommended!", "Always positive and encouraging."] },
  { id: '4', name: 'David Evans', profile: 'Barber', avatar: 'https://picsum.photos/seed/david/200', distance: 4.0, rating: 4.7, bio: "Classic and modern cuts in a relaxed atmosphere. Expert in fades, beard trims, and hot towel shaves.", reviews: ["Best fade I've had in the city. David pays great attention to detail.", "Super cool guy and a great barber. The shop has a great vibe.", "Sometimes runs a little behind schedule, but always worth the wait."] },
  { id: '5', name: 'Eva Williams', profile: 'Car Wash Service', avatar: 'https://picsum.photos/seed/eva/200', distance: 5.5, rating: 4.6, bio: "Mobile car detailing service. We come to you with our own water and power. Eco-friendly products used.", reviews: ["My car looks brand new! Incredible attention to detail.", "So convenient that they come to your home or office.", "Did a good job, but missed a few spots on the interior."] },
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


const SearchPage: React.FC = () => {
  const { status, errorMessage, getPosition } = useGeolocation({ timeout: 10000 });
  const [searchResults, setSearchResults] = useState<ServiceProvider[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [summary, setSummary] = useState<ProfileSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    getPosition();
  }, [getPosition]);
  
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      // In a real app, use position.coords to fetch nearby providers
      setSearchResults(mockProviders);
    } else {
      setSearchResults([]);
    }
  }, [status]);
  
  const handleSummaryClick = async (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setIsModalOpen(true);
    setIsLoadingSummary(true);
    setSummary(null);
    setSummaryError(null);
    
    try {
      const result = await generateProfileSummary(provider);
      setSummary(result);
    } catch(e) {
      setSummaryError("Sorry, we couldn't generate a summary at this time.");
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Find a Professional</h1>
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Search for a service..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        </div>
        
        <div className="text-center mb-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {searchResults.map(provider => (
              <div key={provider.id} className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700 flex flex-col text-left space-y-3 transition-all hover:border-brand-primary hover:shadow-brand-primary/20">
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
                <div className="flex space-x-2 !mt-4">
                  <Button variant="secondary" className="w-full">View Profile</Button>
                  <Button variant="ghost" onClick={() => handleSummaryClick(provider)} className="w-auto px-3 shrink-0">
                    <SparklesIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isModalOpen && selectedProvider && (
         <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md flex flex-col border border-slate-700">
             <header className="flex justify-between items-start p-4 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                    <img src={selectedProvider.avatar} alt={selectedProvider.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-primary" />
                    <div>
                        <h2 className="font-bold text-lg text-white">{selectedProvider.name}</h2>
                        <p className="text-sm text-brand-primary">{selectedProvider.profile}</p>
                    </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                    <CloseIcon className="w-6 h-6" />
                </button>
             </header>
             <main className="p-6 max-h-[60vh] overflow-y-auto">
                {isLoadingSummary && (
                   <div className="flex justify-center items-center h-48">
                     <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-brand-primary rounded-full animate-pulse"></div>
                        <div className="w-3 h-3 bg-brand-primary rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-3 h-3 bg-brand-primary rounded-full animate-pulse [animation-delay:0.4s]"></div>
                     </div>
                   </div>
                )}
                {summaryError && <p className="text-center text-red-400">{summaryError}</p>}
                {summary && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-white flex items-center space-x-2 mb-2"><SparklesIcon className="w-5 h-5 text-brand-primary" /><span>AI Summary</span></h3>
                      <p className="text-slate-300 text-sm">{summary.summary}</p>
                    </div>
                    {summary.highlights.length > 0 && (
                      <div>
                        <h3 className="font-bold text-white mb-2">What People Love</h3>
                        <ul className="space-y-1 list-disc list-inside">
                          {summary.highlights.map((h, i) => <li key={i} className="text-slate-300 text-sm">{h}</li>)}
                        </ul>
                      </div>
                    )}
                    {summary.notes.length > 0 && (
                      <div>
                        <h3 className="font-bold text-white mb-2">Things to Note</h3>
                        <ul className="space-y-1 list-disc list-inside">
                          {summary.notes.map((n, i) => <li key={i} className="text-slate-300 text-sm">{n}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
             </main>
          </div>
         </div>
      )}
    </>
  );
};

export default SearchPage;
