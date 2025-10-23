import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styled } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledLinearGradient = styled(LinearGradient);


interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', disabled, ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-lg justify-center items-center';
  
  const textClasses = 'font-bold text-white text-lg';
  const textVariantClasses = {
    secondary: 'text-white',
    ghost: 'text-brand-light'
  };

  const content = typeof children === 'string' 
    ? <StyledText className={variant === 'primary' ? textClasses : `${textClasses} ${textVariantClasses[variant]}`}>{children}</StyledText>
    : children;

  if (variant === 'primary') {
    return (
      <StyledTouchableOpacity disabled={disabled} className={`${className} ${disabled ? 'opacity-50' : ''}`} {...props}>
        <StyledLinearGradient
          colors={['#0575E6', '#00F260']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={baseClasses}
        >
          {content}
        </StyledLinearGradient>
      </StyledTouchableOpacity>
    );
  }

  const variantClasses = {
    secondary: 'bg-slate-700',
    ghost: 'bg-transparent',
  };

  return (
    <StyledTouchableOpacity 
        className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50' : ''}`} 
        disabled={disabled}
        {...props}
    >
      {content}
    </StyledTouchableOpacity>
  );
};