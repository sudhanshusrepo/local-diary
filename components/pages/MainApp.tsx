
import React, { useState } from 'react';
import { ActiveTab, UserProfile } from '../../types';
import BottomNav from '../BottomNav';
import FeedPage from './FeedPage';
import SearchPage from './SearchPage';
import ConnectPage from './ConnectPage';
import ProfilePage from './ProfilePage';

interface MainAppProps {
  userProfile: UserProfile | null;
  onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ userProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Feed);

  const renderActiveTab = () => {
    switch (activeTab) {
      case ActiveTab.Feed:
        return <FeedPage />;
      case ActiveTab.Search:
        return <SearchPage />;
      case ActiveTab.Connect:
        return <ConnectPage />;
      case ActiveTab.Profile:
        return <ProfilePage userProfile={userProfile} onLogout={onLogout} />;
      default:
        return <FeedPage />;
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-dark pb-20">
      <div className="container mx-auto max-w-lg">
        {renderActiveTab()}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default MainApp;
