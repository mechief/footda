import React from "react";
import styled, { css } from "styled-components";

const ReOrderButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: #e5eef0;
  cursor: default;
  ${(props) => props.clickable && css`
    cursor: pointer;
    &:hover {
      background: #ebf1f5;
    }
  `}
`;

const OrderTextWrapper = styled.span`
  display: inline-block;
  position: relative;
  color: #222;
`;

const OrderArrow = styled.span`
  position: absolute;
  top: calc(50% - 6px);
  right: -16px;
  border-top: 6px solid #222;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid #222;
  ${(props) => props.direction == 'asc' && css`
    border-bottom-color: transparent;
    margin-top: 3px;
  `}
  ${(props) => props.direction == 'desc' && css`
    border-top-color: transparent;
    margin-top: -3px;
  `}
`;

const StandingTableTh = ({ dataName, text, orderType, setOrderType }) => {
  const [orderData, orderDirection] = orderType.split(' ');

  const onClickReOrder = () => {
    if (dataName == 'teamName') {
      return;
    }

    if (orderData != dataName) {
      // rank - asc First, others - desc First
      setOrderType(dataName + ' ' + (dataName === 'rank' ? 'asc' : 'desc'));
    } else {
      setOrderType(dataName + ' ' + (orderDirection === 'asc' ? 'desc' : 'asc'));
    }
  }

  return (
    <th>
      <ReOrderButton onClick={onClickReOrder} clickable={dataName == 'teamName' ? false : true}>
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