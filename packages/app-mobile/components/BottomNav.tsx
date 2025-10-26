
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ActiveTab } from '@shared/types';
import { HomeIcon } from './icons/HomeIcon';
import { SearchIcon } from './icons/SearchIcon';
import { MessageIcon } from './icons/MessageIcon';
import { UserIcon } from './icons/UserIcon';
// Fix: Import `styled` from `nativewind` to add support for the `className` prop.
import { styled } from 'nativewind';

// Fix: Create styled versions of React Native components to use the `className` prop.
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onPress: () => void;
}> = ({ icon, label, isActive, onPress }) => {
  return (
    <StyledTouchableOpacity onPress={onPress} className="flex-1 flex-col items-center justify-center space-y-1 py-2">
      <StyledView className={isActive ? 'text-brand-primary' : 'text-slate-400'}>
        {icon}
      </StyledView>
      <StyledText className={`text-xs font-medium ${isActive ? 'text-brand-primary' : 'text-slate-400'}`}>{label}</StyledText>
      {isActive && <StyledView className="w-8 h-1 bg-brand-primary rounded-full mt-1" />}
    </StyledTouchableOpacity>
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
    <StyledView className="bg-slate-900/80 border-t border-slate-700">
        <StyledView className="flex-row justify-around items-center h-20">
            {navItems.map(item => (
                <NavItem 
                    key={item.tab}
                    icon={item.icon}
                    label={item.label}
                    isActive={activeTab === item.tab}
                    onPress={() => setActiveTab(item.tab)}
                />
            ))}
        </StyledView>
        <StyledView className="h-4 bg-slate-900/80" />
    </StyledView>
  );
};

export default BottomNav;
