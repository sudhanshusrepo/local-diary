import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CloseIcon } from '../icons/CloseIcon';
import { LinearGradient } from 'expo-linear-gradient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView);
const StyledScrollView = styled(ScrollView);
const StyledLinearGradient = styled(LinearGradient);


interface AuthPageProps {
  onLoginSuccess: () => void;
  onSignupSuccess: () => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onSignupSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <StyledView className="flex-1 bg-brand-dark">
      <StyledLinearGradient
        colors={['rgba(5, 117, 230, 0.2)', 'rgba(15, 23, 42, 0.1)']}
        className="absolute top-0 left-0 right-0 bottom-0"
      />
      <StyledSafeAreaView className="flex-1">
        <StyledKeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <StyledScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="handled"
          >
            <StyledView className="relative bg-slate-900/80 border border-slate-700 rounded-2xl p-8 m-4 shadow-2xl">
              <StyledTouchableOpacity onPress={onBack} className="absolute top-4 right-4 z-10">
                <CloseIcon className="w-6 h-6 text-slate-400" />
              </StyledTouchableOpacity>
              <StyledText className="text-3xl font-bold text-center text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </StyledText>
              <StyledText className="text-center text-slate-400 mb-8">
                {isLogin ? "Let's find your next opportunity." : "Join the future of local work."}
              </StyledText>

              <StyledView className="space-y-6">
                {!isLogin && <Input label="Full Name" textContentType="name" />}
                <Input label="Email Address" keyboardType="email-address" textContentType="emailAddress" autoCapitalize="none" />
                <Input label="Password" secureTextEntry textContentType="password" />
                {!isLogin && <Input label="Confirm Password" secureTextEntry textContentType="password" />}
                
                <Button onPress={isLogin ? onLoginSuccess : onSignupSuccess} className="w-full !py-3" variant="primary">
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
              </StyledView>

              <StyledView className="flex-row justify-center items-center mt-8">
                <StyledText className="text-slate-400">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </StyledText>
                <StyledTouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                  <StyledText className="font-semibold text-brand-primary">
                    {isLogin ? 'Sign Up' : 'Login'}
                  </StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            </StyledView>
          </StyledScrollView>
        </StyledKeyboardAvoidingView>
      </StyledSafeAreaView>
    </StyledView>
  );
};

export default AuthPage;