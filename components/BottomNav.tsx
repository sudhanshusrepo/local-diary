
import React from 'react';
import { ActiveTab } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { SearchIcon } from './icons/SearchIcon';
import { MessageIcon } from './icons/MessageIcon';
import { UserIcon } from './icons/UserIcon';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-full space-y-1 transition-transform active:scale-90">
      <div className={`transition-colors duration-300 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`}>
        {icon}
      </div>
      <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-brand-primary' : 'text-slate-400'}`}>{label}</span>
      {isActive && <div className="w-8 h-1 bg-brand-primary rounded-full mt-1"></div>}
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { tab: ActiveTab.Feed, label: 'Feed', icon: <HomeIcon className="w-6 h-6" /> },
    { tab: ActiveTab.Search, label: 'Search', icon: <SearchIcon className="w-6 h-6" /> },
    { tab: ActiveTab.Connect, label: 'Connect', icon: <MessageIcon className="w-6 h-6" /> },
    { tab: ActiveTab.Profile, label: 'Profile', icon: <UserIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-slate-900/80 backdrop-blur-lg border-t border-slate-700 z-40">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map(item => (
          <NavItem 
            key={item.tab}
            icon={item.icon}
            label={item.label}
            isActive={activeTab === item.tab}
            onClick={() => setActiveTab(item.tab)}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
