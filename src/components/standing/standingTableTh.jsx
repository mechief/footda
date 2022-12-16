import React from "react";
import styled, { css } from "styled-components";

const ReOrderButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: #f5f5f5;
  &:hover {
    background: #eee;
  }
`;

const OrderTextWrapper = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
`;

const OrderArrow = styled.span`
  position: absolute;
  top: calc(50% - 6px);
  right: -12px;
  border-top: 6px solid #222;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid #222;
  ${(props) => props.direction == 'asc' && css`
    border-bottom-color: transparent;
    margin-top: +3px
  `}
  ${(props) => props.direction == 'desc' && css`
    border-top-color: transparent;
    margin-top: -3px;
  `}
`;

const StandingTableTh = ({ dataName, text, orderType }) => {
  const [orderData, orderDirection] = orderType.split(' ');

  return (
    <th>
      <ReOrderButton>
        <OrderTextWrapper>
          <span>{text}</span>
          {orderData === dataName &&
            <OrderArrow direction={orderDirection} />
          }
        </OrderTextWrapper>
      </ReOrderButton>
    </th>
  );
}

export default StandingTableTh;