
export enum AuthState {
  LoggedOut,
  Auth,
  NeedsProfileSetup,
  LoggedIn,
}

export enum ActiveTab {
  Feed,
  Search,
  Connect,
  Profile,
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  highestQualification: string;
  workIndustry: string;
  workProfile: string;
  isAvailable: boolean;
  location: { lat: number; lng: number } | null;
  bio: string;
  employmentStatus: 'Employed' | 'Unemployed' | 'Freelancer';
  company?: string;
  jobTitle?: string;
  lookingFor?: string;
  services?: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  profile: string;
  avatar: string;
  distance: number;
  rating: number;
}

export interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
}