import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

interface InputProps extends TextInputProps {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <StyledView className="w-full">
      <StyledText className="text-sm font-medium text-slate-300 mb-1 ml-1">
        {label}
      </StyledText>
      <StyledTextInput
        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-brand-primary focus:border-2"
        placeholderTextColor="#94a3b8"
        {...props}
      />
    </StyledView>
  );
};
