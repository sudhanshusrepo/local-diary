import React, { useState } from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { Button } from './ui/Button';

interface HeaderProps {
  onLoginClick: () => void;
  onNavigate: (page: 'landing' | 'search' | 'blogs') => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Search', page: 'search' as const },
    { name: 'Blogs', page: 'blogs' as const },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        <button onClick={() => onNavigate('landing')} className="text-2xl font-bold tracking-tighter text-white">
          <span className="bg-clip-text text-transparent bg-gradient-primary">local diary</span>
        </button>
        
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button key={link.name} onClick={() => onNavigate(link.page)} className="text-slate-300 hover:text-white transition-colors">
              {link.name}
            </button>
          ))}
          <Button onClick={onLoginClick} variant="secondary" className="px-4 py-2">
            Login / Sign Up
          </Button>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-brand-dark/90 backdrop-blur-sm p-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => { onNavigate(link.page); setIsMenuOpen(false); }} className="text-slate-300 hover:text-white transition-colors text-center py-2">
                {link.name}
              </button>
            ))}
            <Button onClick={onLoginClick} variant="primary" className="w-full">
                Login / Sign Up
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;