import React, { memo } from "react";
import styled, { css } from "styled-components";

const StyledFormItem = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin: 0 1px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 4px;

  ${props => props.matchResult === 'W' && css`
    background: #3dbf36;
  `}

  ${props => props.matchResult === 'D' && css`
    background: #808080;
  `}

  ${props => props.matchResult === 'L' && css`
    background: #e55252;
  `}
`;

const StandingFormItem = memo(({ matchResult }) => {
  return (
    <StyledFormItem matchResult={matchResult}>{matchResult}</StyledFormItem>
  );
});

export default StandingFormItem;