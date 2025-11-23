
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CloseIcon } from '../icons/CloseIcon';

interface AuthPageProps {
  onLoginSuccess: () => void;
  onSignupSuccess: () => void;
  onBack: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onSignupSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Mock handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onSignupSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial from-brand-secondary/20 to-brand-dark p-4">
      <div className="relative w-full max-w-md bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <button onClick={onBack} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-slate-400 mb-8">
          {isLogin ? "Let's find your next opportunity." : "Join the future of local work."}
        </p>

        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-6">
          {!isLogin && <Input id="name" label="Full Name" type="text" required />}
          <Input id="email" label="Email Address" type="email" required />
          <Input id="password" label="Password" type="password" required />
          {!isLogin && <Input id="confirm-password" label="Confirm Password" type="password" required />}
          
          <Button type="submit" className="w-full !py-4 text-lg">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        <p className="text-center text-slate-400 mt-8">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-brand-primary hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
