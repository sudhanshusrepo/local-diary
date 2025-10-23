import React from 'react';
import { UserProfile } from '../../../shared/types';
import { Button } from '../ui/Button';

interface ProfilePageProps {
  userProfile: UserProfile | null;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile, onLogout }) => {
  if (!userProfile) {
    return (
      <div className="p-4 text-center">
        <p className="text-slate-400">Loading profile...</p>
      </div>
    );
  }

  const { name, avatarUrl, workProfile, workIndustry, isAvailable, bio, employmentStatus, company, jobTitle, lookingFor, services } = userProfile;

  return (
    <div className="p-4">
      <div className="flex flex-col items-center mt-8">
        <img src={avatarUrl} alt={name} className="w-32 h-32 rounded-full object-cover border-4 border-brand-primary shadow-lg" />
        <h1 className="text-3xl font-bold text-white mt-4">{name}</h1>
        <p className="text-lg text-brand-primary font-medium">{workProfile}</p>
        <div className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${isAvailable ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
          {isAvailable ? 'Available for work' : 'Not available'}
        </div>
      </div>

      <div className="mt-10 bg-slate-800 rounded-lg p-6 shadow-lg border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">About</h2>
        <p className="text-slate-300">{bio}</p>
        <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
          <div>
            <p className="text-sm text-slate-400">Industry</p>
            <p className="text-md text-white font-medium">{workIndustry}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Employment Status</p>
            <p className="text-md text-white font-medium">{employmentStatus}</p>
            {employmentStatus === 'Employed' && company && jobTitle && (
              <p className="text-sm text-slate-300">{jobTitle} at {company}</p>
            )}
            {employmentStatus === 'Unemployed' && lookingFor && (
               <p className="text-sm text-slate-300">Seeking: {lookingFor}</p>
            )}
            {employmentStatus === 'Freelancer' && services && (
               <p className="text-sm text-slate-300">Services: {services}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button variant="secondary" className="w-full">Edit Profile</Button>
      </div>
      <div className="mt-4">
        <Button onClick={onLogout} variant="ghost" className="w-full text-red-400 hover:bg-red-500/20">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;