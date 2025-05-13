// Import React and necessary dependencies
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the spinner animation
const sp6 = keyframes`
  33% { inset: -10px; transform: rotate(0deg); }
  66% { inset: -10px; transform: rotate(90deg); }
  100% { inset: 0; transform: rotate(90deg); }
`;

// Styled component for the spinner
const SpinnerWrapper = styled.div`
  width: 40px;
  height: 40px;
  color: #25b09b;
  position: relative;
  background: linear-gradient(currentColor 0 0) center/100% 10px,
    linear-gradient(currentColor 0 0) center/10px 100%;
  background-repeat: no-repeat;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(currentColor 0 0) 0 0,
      linear-gradient(currentColor 0 0) 100% 0,
      linear-gradient(currentColor 0 0) 0 100%,
      linear-gradient(currentColor 0 0) 100% 100%;
    background-size: 15.5px 15.5px;
    background-repeat: no-repeat;
    animation: ${sp6} 1.5s infinite cubic-bezier(0.3, 1, 0, 1);
  }
`;

// Spinner Component
const Spinner = () => {
  return <SpinnerWrapper />;
};

export default Spinner;
