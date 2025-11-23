
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { UserProfile } from '../../types';

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

  const handleSubmit = (e: React.FormEvent) => {
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
    
    onComplete({
      name,
      highestQualification: qualification,
      workIndustry: industry,
      workProfile: profile,
      isAvailable,
      avatarUrl: `https://picsum.photos/seed/${name}/200`,
      location: null,
      bio: `A passionate ${profile} in the ${industry} industry.`,
      employmentStatus: employmentStatus as 'Employed' | 'Unemployed' | 'Freelancer',
      ...profileData,
    });
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