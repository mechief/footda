import React from "react";
import styled from "styled-components";

const IconWrapper = styled.span`
  display: inline-block;
  padding: 0 3px;
  & > svg {
    vertical-align: middle;
  }
`;

export const IconOpenInNewReverse = ({ size = 24 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.7 20.5C19.2 20.5 19.625 20.325 19.975 19.975C20.325 19.625 20.5 19.2 20.5 18.7V5.3C20.5 4.8 20.325 4.375 19.975 4.025C19.625 3.675 19.2 3.5 18.7 3.5H12.375V5H18.7C18.7667 5 18.8333 5.03333 18.9 5.1C18.9667 5.16667 19 5.23333 19 5.3V18.7C19 18.7667 18.9667 18.8333 18.9 18.9C18.8333 18.9667 18.7667 19 18.7 19H5.3C5.23333 19 5.16667 18.9667 5.1 18.9C5.03333 18.8333 5 18.7667 5 18.7V12.375H3.5V18.7C3.5 19.2 3.675 19.625 4.025 19.975C4.375 20.325 4.8 20.5 5.3 20.5H18.7ZM14.275 15.325L15.325 14.275L6.05 5H10V3.5H3.5V10H5V6.05L14.275 15.325Z" fill="black"/>
    </svg>
  );
}