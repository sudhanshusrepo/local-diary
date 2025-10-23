import React, { useState, useCallback } from 'react';
import LandingPage from './components/pages/LandingPage';
import AuthPage from './components/pages/AuthPage';
import ProfileSetupPage from './components/pages/ProfileSetupPage';
import MainApp from './components/pages/MainApp';
import AIAssistant from './components/AIAssistant';
import { AuthState, UserProfile } from '../shared/types';
import BlogsPage from './components/pages/BlogsPage';
import PublicSearchPage from './components/pages/PublicSearchPage';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.LoggedOut);
  const [publicPage, setPublicPage] = useState<'landing' | 'blogs' | 'search'>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLoginSuccess = useCallback(() => {
    const hasProfile = false; // Mock check
    if (hasProfile) {
      setAuthState(AuthState.LoggedIn);
    } else {
      setAuthState(AuthState.NeedsProfileSetup);
    }
  }, []);

  const handleSignupSuccess = useCallback(() => {
    setAuthState(AuthState.NeedsProfileSetup);
  }, []);

  const handleProfileSetupComplete = useCallback((profile: UserProfile) => {
    setUserProfile(profile);
    setAuthState(AuthState.LoggedIn);
  }, []);

  const handleLogout = useCallback(() => {
    setUserProfile(null);
    setAuthState(AuthState.LoggedOut);
    setPublicPage('landing');
  }, []);
  
  const handleNavigate = (page: 'landing' | 'search' | 'blogs') => {
    setPublicPage(page);
  };
  
  const handleLoginClick = () => setAuthState(AuthState.Auth);

  const renderContent = () => {
    switch (authState) {
      case AuthState.LoggedIn:
        return <MainApp userProfile={userProfile} onLogout={handleLogout} />;
      case AuthState.NeedsProfileSetup:
        return <ProfileSetupPage onComplete={handleProfileSetupComplete} />;
      case AuthState.Auth:
        return <AuthPage onLoginSuccess={handleLoginSuccess} onSignupSuccess={handleSignupSuccess} onBack={() => setAuthState(AuthState.LoggedOut)} />;
      case AuthState.LoggedOut:
      default:
        switch(publicPage) {
          case 'blogs':
            return <BlogsPage onLoginClick={handleLoginClick} onNavigate={handleNavigate} />;
          case 'search':
            return <PublicSearchPage onLoginClick={handleLoginClick} onNavigate={handleNavigate} />;
          case 'landing':
          default:
            return <LandingPage onLoginClick={handleLoginClick} onNavigate={handleNavigate} />;
        }
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark font-sans">
      {renderContent()}
      <AIAssistant />
    </div>
  );
};

export default App;