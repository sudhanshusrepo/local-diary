
import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { styled } from 'nativewind';
import { Conversation } from '@shared/types';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledFlatList = styled(FlatList<Conversation>);
const StyledImage = styled(Image);

const mockConversations: Conversation[] = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://picsum.photos/seed/alice/200', lastMessage: 'Great, see you tomorrow at 10 AM.', timestamp: '10m ago' },
  { id: '2', name: 'Ben Carter', avatar: 'https://picsum.photos/seed/ben/200', lastMessage: 'I have a quick question about the faucet.', timestamp: '1h ago' },
  { id: '3', name: 'Chloe Davis', avatar: 'https://picsum.photos/seed/chloe/200', lastMessage: 'Thank you for the session!', timestamp: '3h ago' },
];

const ConnectPage: React.FC = () => {
  const renderItem = ({ item }: { item: Conversation }) => (
    <StyledView className="bg-slate-800 rounded-lg p-3 flex-row items-center space-x-4 border border-slate-700">
      <StyledImage source={{ uri: item.avatar }} className="w-14 h-14 rounded-full" />
      <StyledView className="flex-1">
        <StyledView className="flex-row justify-between items-center">
          <StyledText className="text-md font-bold text-white">{item.name}</StyledText>
          <StyledText className="text-xs text-slate-400">{item.timestamp}</StyledText>
        </StyledView>
        <StyledText className="text-sm text-slate-300" numberOfLines={1}>{item.lastMessage}</StyledText>
      </StyledView>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 p-4">
      <StyledText className="text-2xl font-bold text-white mb-6">Connect</StyledText>
      <StyledFlatList
        data={mockConversations}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <StyledView className="h-2" />}
      />
    </StyledView>
  );
};

export default ConnectPage;
