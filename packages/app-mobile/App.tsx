
import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { AuthState } from '@shared/types';
import { styled } from 'nativewind';
import AuthPage from './components/pages/AuthPage';
import MainApp from './components/pages/MainApp';

declare const __DEV__: boolean;

const StyledView = styled(View);

export default function App() {
  const [authState, setAuthState] = useState<AuthState>(AuthState.Auth);

  const handleLoginSuccess = useCallback(() => {
    // In a real app, you would verify credentials and fetch a profile
    setAuthState(AuthState.LoggedIn);
  }, []);

  const handleSignupSuccess = useCallback(() => {
    // For this demo, we'll go straight to the logged-in state
    setAuthState(AuthState.LoggedIn);
  }, []);
  
  const handleLogout = useCallback(() => {
    setAuthState(AuthState.Auth);
  }, []);

  const renderContent = () => {
    switch (authState) {
      case AuthState.Auth:
        return (
          <AuthPage
            onLoginSuccess={handleLoginSuccess}
            onSignupSuccess={handleSignupSuccess}
            onBack={() => {
              /* No-op for now as it's the first screen */
            }}
          />
        );
      case AuthState.LoggedIn:
        return <MainApp onLogout={handleLogout} />;
      default:
        // Fallback to Auth page
        return (
           <AuthPage
            onLoginSuccess={handleLoginSuccess}
            onSignupSuccess={handleSignupSuccess}
            onBack={() => {}}
          />
        );
    }
  };

  return (
    <StyledView className="flex-1 bg-brand-dark">
      <StatusBar style="light" />
      {renderContent()}
    </StyledView>
  );
}
