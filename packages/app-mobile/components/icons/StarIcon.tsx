import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { styled } from 'nativewind';

const StyledSvg = styled(Svg);

export const StarIcon: React.FC<SvgProps> = (props) => (
  <StyledSvg
    fill="currentColor"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M10.868 2.884c.321-.772 1.305-.772 1.626 0l1.838 4.442a.86.86 0 00.642.468l4.901.712c.85.123 1.188 1.166.574 1.765l-3.548 3.458a.86.86 0 00-.248.76l.838 4.882c.145.846-.743 1.498-1.512 1.107l-4.363-2.293a.86.86 0 00-.804 0l-4.363 2.293c-.769.403-1.656-.26-1.512-1.107l.838-4.882a.86.86 0 00-.248-.76L.435 10.27c-.614-.6-.276-1.642.574-1.765l4.901-.712a.86.86 0 00.642-.468l1.838-4.442z"
      clipRule="evenodd"
    />
  </StyledSvg>
);