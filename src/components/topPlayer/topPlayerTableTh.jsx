import React from "react";
import styled, { css } from "styled-components";

const ReOrderButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: #f5f5f5;
  cursor: default;
  ${(props) => props.clickable && css`
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  `}
`;

const OrderTextWrapper = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
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
    margin-top: +3px
  `}
  ${(props) => props.direction == 'desc' && css`
    border-top-color: transparent;
    margin-top: -3px;
  `}
`;

const TopPlayerTableTh = ({ dataName, text, orderData, setOrderData }) => {
  const onClickReOrder = () => {
    if (!['goals', 'assists'].includes(dataName)) {
      return;
    }

    if (orderData != dataName) {
      setOrderData(dataName);
    }
  }

  return (
    <th>
      <ReOrderButton 
        onClick={onClickReOrder}
        clickable={['goals', 'assists'].includes(dataName) ? true : false}>
        <OrderTextWrapper>
          <span>{text}</span>
          {orderData === dataName &&
            <OrderArrow direction="desc" />
          }
        </OrderTextWrapper>
      </ReOrderButton>
    </th>
  );
}

export default TopPlayerTableTh;