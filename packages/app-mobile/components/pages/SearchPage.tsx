import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Modal, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { ServiceProvider } from '@shared/types';
import { SearchIcon } from '../icons/SearchIcon';
import { StarIcon } from '../icons/StarIcon';
import { Button } from '../ui/Button';
import { generateProfileSummary, ProfileSummary } from '@shared/services/geminiService';
import { SparklesIcon } from '../icons/SparklesIcon';
import { CloseIcon } from '../icons/CloseIcon';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledFlatList = styled(FlatList<ServiceProvider>);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);
const StyledScrollView = styled(ScrollView);

const mockProviders: ServiceProvider[] = [
  { id: '1', name: 'Alice Johnson', profile: 'Electrician', avatar: 'https://picsum.photos/seed/alice/200', distance: 1.2, rating: 4.8, bio: "Certified electrician with over 10 years of experience in residential and commercial wiring. I pride myself on being punctual, clean, and efficient.", reviews: ["Alice was fantastic! She arrived on time and fixed my lighting issue in no time.", "Very professional and knowledgeable. Left the workspace cleaner than she found it.", "A bit pricey, but the quality of work is worth it."] },
  { id: '2', name: 'Ben Carter', profile: 'Plumber', avatar: 'https://picsum.photos/seed/ben/200', distance: 2.5, rating: 4.9, bio: "Your go-to plumber for everything from leaky faucets to full bathroom renovations. Available 24/7 for emergencies.", reviews: ["Ben saved us during a midnight plumbing emergency. Can't thank him enough!", "Extremely reliable and honest. His quote was fair and the work was top-notch.", "He explained everything clearly and was very patient with my questions."] },
  { id: '3', name: 'Chloe Davis', profile: 'Private Tutor (Math)', avatar: 'https://picsum.photos/seed/chloe/200', distance: 3.1, rating: 5.0, bio: "Patient and experienced math tutor specializing in high school algebra and calculus. I make learning fun and accessible.", reviews: ["Chloe is a miracle worker! My son's grades improved dramatically after just a few sessions.", "She has a real gift for teaching. Highly recommended!", "Always positive and encouraging."] },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <StyledView className="flex-row items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`} />
    ))}
    <StyledText className="ml-2 text-sm text-slate-400">{rating.toFixed(1)}</StyledText>
  </StyledView>
);

const SearchPage: React.FC = () => {
    const [locationStatus, setLocationStatus] = useState('Checking location...');
    const [searchResults, setSearchResults] = useState<ServiceProvider[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
    const [summary, setSummary] = useState<ProfileSummary | null>(null);
    const [isLoadingSummary, setIsLoadingSummary] = useState(false);
    const [summaryError, setSummaryError] = useState<string | null>(null);

    useEffect(() => {
        // Mocking geolocation for mobile demo
        setLocationStatus('Showing results near you.');
        setSearchResults(mockProviders);
    }, []);

    const handleSummaryClick = async (provider: ServiceProvider) => {
        setSelectedProvider(provider);
        setIsModalOpen(true);
        setIsLoadingSummary(true);
        setSummary(null);
        setSummaryError(null);

        try {
            const result = await generateProfileSummary(provider);
            setSummary(result);
        } catch(e) {
            setSummaryError("Sorry, we couldn't generate a summary at this time.");
        } finally {
            setIsLoadingSummary(false);
        }
    };
    
    const renderProviderCard = ({ item }: { item: ServiceProvider }) => (
      <StyledView className="bg-slate-800 rounded-xl p-4 shadow-lg border border-slate-700 space-y-3">
        <StyledView className="flex-row items-center space-x-4">
          <StyledImage source={{ uri: item.avatar }} className="w-16 h-16 rounded-full border-2 border-brand-primary" />
          <StyledView className="flex-1">
            <StyledText className="text-lg font-bold text-white">{item.name}</StyledText>
            <StyledText className="text-brand-primary font-medium text-sm">{item.profile}</StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="flex-row items-center justify-between pt-2 border-t border-slate-700/50">
          <StarRating rating={item.rating} />
          <StyledText className="text-sm text-slate-400">{item.distance} km away</StyledText>
        </StyledView>
        <StyledView className="flex-row space-x-2 pt-1">
          <Button variant="secondary" className="flex-1 py-2">View Profile</Button>
          <Button variant="ghost" onPress={() => handleSummaryClick(item)} className="p-3">
            <SparklesIcon className="w-5 h-5 text-brand-light" />
          </Button>
        </StyledView>
      </StyledView>
    );

    return (
        <>
            <StyledView className="flex-1 p-4">
                <StyledText className="text-2xl font-bold text-white mb-4">Find a Professional</StyledText>
                <StyledView className="relative mb-4">
                    <StyledTextInput 
                        placeholder="Search for a service..."
                        placeholderTextColor="#94a3b8"
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-white"
                    />
                    <StyledView className="absolute left-3 top-1/2 -translate-y-2.5">
                       <SearchIcon className="w-5 h-5 text-slate-400" />
                    </StyledView>
                </StyledView>
                <StyledText className="text-sm text-slate-400 mb-6 text-center">{locationStatus}</StyledText>
                
                <StyledFlatList
                    data={searchResults}
                    renderItem={renderProviderCard}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <StyledView className="h-4" />}
                />
            </StyledView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
            >
              <StyledView className="flex-1 justify-end bg-black/60">
                <StyledView className="bg-slate-800 rounded-t-2xl shadow-2xl max-h-[80vh] border-t border-slate-700">
                  {selectedProvider && (
                     <StyledView className="flex-row justify-between items-start p-4 border-b border-slate-700">
                      <StyledView className="flex-row items-center space-x-3 flex-1">
                        <StyledImage source={{ uri: selectedProvider.avatar }} className="w-12 h-12 rounded-full border-2 border-brand-primary" />
                        <StyledView>
                          <StyledText className="font-bold text-lg text-white">{selectedProvider.name}</StyledText>
                          <StyledText className="text-sm text-brand-primary">{selectedProvider.profile}</StyledText>
                        </StyledView>
                      </StyledView>
                      <StyledTouchableOpacity onPress={() => setIsModalOpen(false)} className="p-1">
                          <CloseIcon className="w-6 h-6 text-slate-400" />
                      </StyledTouchableOpacity>
                    </StyledView>
                  )}
                  <StyledScrollView contentContainerStyle={{ padding: 24 }}>
                    {isLoadingSummary && (
                      <StyledView className="h-48 justify-center items-center">
                          <ActivityIndicator size="large" color="#00F260" />
                      </StyledView>
                    )}
                    {summaryError && <StyledText className="text-center text-red-400">{summaryError}</StyledText>}
                    {summary && (
                      <StyledView className="space-y-4">
                        <StyledView>
                           <StyledView className="flex-row items-center space-x-2 mb-2">
                             <SparklesIcon className="w-5 h-5 text-brand-primary" />
                             <StyledText className="font-bold text-white text-base">AI Summary</StyledText>
                           </StyledView>
                           <StyledText className="text-slate-300 text-sm">{summary.summary}</StyledText>
                        </StyledView>
                        {summary.highlights.length > 0 && (
                          <StyledView>
                            <StyledText className="font-bold text-white text-base mb-2">What People Love</StyledText>
                            {summary.highlights.map((h, i) => <StyledText key={i} className="text-slate-300 text-sm mb-1">• {h}</StyledText>)}
                          </StyledView>
                        )}
                         {summary.notes.length > 0 && (
                          <StyledView>
                            <StyledText className="font-bold text-white text-base mb-2">Things to Note</StyledText>
                            {summary.notes.map((n, i) => <StyledText key={i} className="text-slate-300 text-sm mb-1">• {n}</StyledText>)}
                          </StyledView>
                        )}
                      </StyledView>
                    )}
                  </StyledScrollView>
                </StyledView>
              </StyledView>
            </Modal>
        </>
    );
};
export default SearchPage;