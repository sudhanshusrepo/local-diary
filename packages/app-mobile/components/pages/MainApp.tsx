import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { ActiveTab } from '@shared/types';
import BottomNav from '../BottomNav';
import { styled } from 'nativewind';
import FeedPage from './FeedPage';
import SearchPage from './SearchPage';
import ConnectPage from './ConnectPage';
import ProfilePage from './ProfilePage';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);

interface MainAppProps {
    onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onLogout }) => {
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
            return <ProfilePage onLogout={onLogout} />;
          default:
            return <FeedPage />;
        }
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-brand-dark">
            <StyledView className="flex-1">
                {renderActiveTab()}
            </StyledView>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </StyledSafeAreaView>
    );
};

export default MainApp;