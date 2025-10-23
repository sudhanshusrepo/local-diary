import React from 'react';
import Header from '../Header';
import { Button } from '../ui/Button';
import { SearchIcon } from '../icons/SearchIcon';

interface LandingPageProps {
  onLoginClick: () => void;
  onNavigate: (page: 'landing' | 'search' | 'blogs') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onNavigate }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark">
      {/* Background Glows */}
      <div 
        className="absolute top-[-10rem] right-[-10rem] w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] bg-india-saffron rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"
        style={{ animationDelay: '2s' }}
      ></div>
      <div 
        className="absolute bottom-[-10rem] left-[-10rem] w-[25rem] h-[25rem] md:w-[40rem] md:h-[40rem] bg-india-green rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"
        style={{ animationDelay: '4s' }}
      ></div>

      <Header onLoginClick={onLoginClick} onNavigate={onNavigate} />
      
      <main className="relative z-0 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Find Local Help, <span className="bg-clip-text text-transparent bg-gradient-primary">Instantly</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Your modern-day diary for every local need. Connect with tutors, plumbers, barbers, and more, right in your neighborhood.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full max-w-xl mx-auto">
            <form onSubmit={(e) => { e.preventDefault(); onNavigate('search'); }} className="flex items-center">
              <input 
                type="text" 
                placeholder="e.g., 'electrician near me'" 
                className="flex-grow bg-transparent text-white placeholder-slate-400 focus:outline-none px-4"
              />
              <Button type="submit" className="rounded-full !py-3 !px-5">
                <SearchIcon className="w-6 h-6" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;