
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
// Fix: Import `styled` from `nativewind` to add support for the `className` prop.
import { styled } from 'nativewind';

// Fix: Create a styled version of the Svg component.
const StyledSvg = styled(Svg);

export const SearchIcon: React.FC<SvgProps> = (props) => (
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
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </StyledSvg>
);
