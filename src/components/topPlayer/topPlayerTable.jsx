import React from "react";
import styled from "styled-components";

import TopPlayerTableTh from "./topPlayerTableTh";
import TopPlayerTableTr from "./topPlayerTableTr";

const Table = styled.table`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-collapse: collapse;
  & th,
  & td {
    text-align: center;
    border: 1px solid #bbb;
  }
  & th {
    font-size: 16px;
  }
  & td {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

const columns = [
  {dataName: 'rank', text: '순위'},
  {dataName: 'name', text: '이름'},
  {dataName: 'appearences', text: '출장경기 (교체출전)'},
  {dataName: 'goals', text: '득점'},
  {dataName: 'assists', text: '도움'},
  {dataName: 'goalAssists', text: '공격포인트'},
  {dataName: 'minutes', text: '출장시간'},
  {dataName: 'yellowCard', text: '경고'},
  {dataName: 'red', text: '퇴장'},
];

const calcRanks = (playersData, orderData) => {
  const ranksTargetProperty = orderData === 'goals' ? 'total' : 'assists';
  let lastRank = 1;

  return new Array(playersData.length).fill(0).map((v, i, arr) => {
    if (i === 0) return lastRank;
    if (playersData[i].statistics[0].goals[ranksTargetProperty] === playersData[i - 1].statistics[0].goals[ranksTargetProperty]) {
      return lastRank;
    } else {
      lastRank = i + 1;
      return lastRank;
    }
  });
}

const TopPlayerTable = ({ playersData, orderData, setOrderData }) => {
  const ranks = calcRanks(playersData, orderData);
  
  return (
    <Table>
      <caption>선수 기록 표</caption>
      <thead>
        <tr>
          { columns.map((column) => 
            <TopPlayerTableTh key={`th_${column.dataName}`} dataName={column.dataName} text={column.text} orderData={orderData} setOrderData={setOrderData} />
          )}
        </tr>
      </thead>
      <tbody>
        { playersData.map((playerData, i) => 
          <TopPlayerTableTr key={`player_${playerData.player.id}`} playerData={playerData} rank={ranks[i]} />
        )}
      </tbody>
    </Table>    
  );
}

export default TopPlayerTable;