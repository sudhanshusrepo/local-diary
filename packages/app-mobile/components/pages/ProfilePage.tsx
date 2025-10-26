import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { UserProfile } from '@shared/types';
import { Button } from '../ui/Button';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

interface ProfilePageProps {
    onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
    // Mock userProfile for UI development until profile setup is built
    const userProfile: UserProfile | null = {
        name: 'Jane Doe',
        avatarUrl: `https://picsum.photos/seed/jane/200`,
        workProfile: 'Freelance Graphic Designer',
        workIndustry: 'Creative Arts',
        isAvailable: true,
        bio: 'Creative and detail-oriented graphic designer with a passion for branding and user interface design. Let\'s create something beautiful together!',
        highestQualification: "Bachelor's Degree",
        employmentStatus: 'Freelancer',
        services: 'Logo Design, UI/UX, Brand Identity',
        location: null
    };

    if (!userProfile) {
        return (
            <StyledView className="flex-1 items-center justify-center p-4">
                <StyledText className="text-slate-400">Loading profile...</StyledText>
            </StyledView>
        );
    }

    const { name, avatarUrl, workProfile, workIndustry, isAvailable, bio, employmentStatus, company, jobTitle, lookingFor, services } = userProfile;

    return (
        <StyledScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
            <StyledView className="items-center mt-8">
                <StyledImage source={{ uri: avatarUrl }} className="w-32 h-32 rounded-full border-4 border-brand-primary" />
                <StyledText className="text-3xl font-bold text-white mt-4">{name}</StyledText>
                <StyledText className="text-lg text-brand-primary font-medium">{workProfile}</StyledText>
                <StyledView className={`mt-2 px-3 py-1 rounded-full ${isAvailable ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    <StyledText className={`text-sm font-semibold ${isAvailable ? 'text-green-300' : 'text-red-300'}`}>
                        {isAvailable ? 'Available for work' : 'Not available'}
                    </StyledText>
                </StyledView>
            </StyledView>

            <StyledView className="mt-10 bg-slate-800 rounded-lg p-6 border border-slate-700">
                <StyledText className="text-xl font-bold text-white mb-4">About</StyledText>
                <StyledText className="text-slate-300">{bio}</StyledText>
                <StyledView className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                    <StyledView>
                        <StyledText className="text-sm text-slate-400">Industry</StyledText>
                        <StyledText className="text-md text-white font-medium">{workIndustry}</StyledText>
                    </StyledView>
                    <StyledView>
                        <StyledText className="text-sm text-slate-400">Employment Status</StyledText>
                        <StyledText className="text-md text-white font-medium">{employmentStatus}</StyledText>
                        {employmentStatus === 'Employed' && company && jobTitle && (
                            <StyledText className="text-sm text-slate-300">{jobTitle} at {company}</StyledText>
                        )}
                        {employmentStatus === 'Unemployed' && lookingFor && (
                            <StyledText className="text-sm text-slate-300">Seeking: {lookingFor}</StyledText>
                        )}
                        {employmentStatus === 'Freelancer' && services && (
                            <StyledText className="text-sm text-slate-300">Services: {services}</StyledText>
                        )}
                    </StyledView>
                </StyledView>
            </StyledView>

            <StyledView className="mt-6">
                <Button variant="secondary" className="w-full py-3">
                    Edit Profile
                </Button>
            </StyledView>
            <StyledView className="mt-4 mb-4">
                 <Button onPress={onLogout} variant="ghost" className="w-full">
                    {/* Fix: Replace `Text` with `StyledText` to support `className` prop */}
                    <StyledText className="text-red-400 font-bold text-lg">Logout</StyledText>
                 </Button>
            </StyledView>
        </StyledScrollView>
    );
};

export default ProfilePage;
