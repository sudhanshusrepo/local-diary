
import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const FeedPage: React.FC = () => {
    return (
        <StyledView className="flex-1 items-center justify-center">
            <StyledText className="text-white text-2xl">Feed Page</StyledText>
        </StyledView>
    );
};
export default FeedPage;
