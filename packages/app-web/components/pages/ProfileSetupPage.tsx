import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { UserProfile } from '../../../shared/types';
import { UserIcon } from '../icons/UserIcon';
import { fetchJSON } from '../../services/apiClient';

interface ProfileSetupPageProps {
  onComplete: (profile: UserProfile) => void;
}

const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [industry, setIndustry] = useState('');
  const [profile, setProfile] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [employmentStatus, setEmploymentStatus] = useState<'Employed' | 'Unemployed' | 'Freelancer' | ''>('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [services, setServices] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !qualification || !industry || !profile || !employmentStatus) {
      alert("Please fill all mandatory fields.");
      return;
    }
    
    const profileData: Partial<UserProfile> = {};

    if (employmentStatus === 'Employed') {
        if (!company || !jobTitle) {
            alert("Please fill in Company Name and Job Title.");
            return;
        }
        profileData.company = company;
        profileData.jobTitle = jobTitle;
    } else if (employmentStatus === 'Unemployed') {
        if (!lookingFor) {
            alert("Please fill in what you are looking for.");
            return;
        }
        profileData.lookingFor = lookingFor;
    } else if (employmentStatus === 'Freelancer') {
        if (!services) {
            alert("Please fill in the services you offer.");
            return;
        }
        profileData.services = services;
    }

    const finalAvatarUrl = avatarPreview || `https://picsum.photos/seed/${name || 'default'}/200`;

    const finalProfile: UserProfile = {
      name,
      highestQualification: qualification,
      workIndustry: industry,
      workProfile: profile,
      isAvailable,
      avatarUrl: finalAvatarUrl,
      location: null,
      bio: `A passionate ${profile} in the ${industry} industry.`,
      employmentStatus: employmentStatus as 'Employed' | 'Unemployed' | 'Freelancer',
      ...profileData,
    };

    try {
      await fetchJSON('/api/profile', {
        method: 'PUT',
        body: JSON.stringify({ name: finalProfile.name, avatar_url: finalProfile.avatarUrl, bio: finalProfile.bio })
      });
    } catch {}

    onComplete(finalProfile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-lg bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Complete Your Profile
        </h2>
        <p className="text-center text-slate-400 mb-8">
          This information helps others connect with you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="avatar-upload" className="cursor-pointer group">
              <div className="w-32 h-32 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500 group-hover:border-brand-primary transition-colors relative">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-16 h-16 text-slate-500" />
                )}
                 <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-semibold">Upload</p>
                </div>
              </div>
              <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </label>
          </div>

          <Input id="name" label="Full Name *" type="text" value={name} onChange={e => setName(e.target.value)} required />
          <Select 
            id="qualification" 
            label="Highest Qualification *" 
            value={qualification} 
            onChange={e => setQualification(e.target.value)} 
            options={["High School", "Bachelor's Degree", "Master's Degree", "PhD", "Vocational Training"]} 
            required 
          />
          <Select 
            id="industry" 
            label="Current Work Industry *" 
            value={industry} 
            onChange={e => setIndustry(e.target.value)}
            options={["Technology", "Healthcare", "Education", "Construction", "Hospitality", "Creative Arts"]} 
            required 
          />
          <Input 
            id="profile" 
            label="Work Profile (e.g., Plumber, Web Developer) *" 
            type="text" 
            value={profile} 
            onChange={e => setProfile(e.target.value)} 
            required 
          />

          <Select 
            id="employmentStatus" 
            label="Current Employment Status *" 
            value={employmentStatus} 
            onChange={e => setEmploymentStatus(e.target.value as any)}
            options={["Employed", "Unemployed", "Freelancer"]} 
            required 
          />

          {employmentStatus === 'Employed' && (
            <>
              <Input id="company" label="Company Name *" type="text" value={company} onChange={e => setCompany(e.target.value)} required />
              <Input id="jobTitle" label="Job Title *" type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} required />
            </>
          )}
          {employmentStatus === 'Unemployed' && (
            <Input id="lookingFor" label="What are you looking for? *" type="text" value={lookingFor} onChange={e => setLookingFor(e.target.value)} required placeholder="e.g., Full-time roles in tech" />
          )}
          {employmentStatus === 'Freelancer' && (
            <Input id="services" label="Services Offered *" type="text" value={services} onChange={e => setServices(e.target.value)} required placeholder="e.g., Web Design, SEO, Content Writing" />
          )}

          <Toggle label="Available for work proposals" enabled={isAvailable} setEnabled={setIsAvailable} />

          <Button type="submit" className="w-full !py-4 text-lg mt-4">
            Save & Continue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
