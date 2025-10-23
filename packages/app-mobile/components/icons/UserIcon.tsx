
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
// Fix: Import `styled` from `nativewind` to add support for the `className` prop.
import { styled } from 'nativewind';

// Fix: Create a styled version of the Svg component.
const StyledSvg = styled(Svg);

export const UserIcon: React.FC<SvgProps> = (props) => (
  <StyledSvg
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </StyledSvg>
);
