import React from "react";
import styled from "styled-components";

import { getLeagueNameKr } from "../../service/apiFootballService";

import StandingTableTh from "./standingTableTh";
import StandingTableTr from "./standingTableTr";

const Table = styled.table`
  width: 100%;
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
  {dataName: 'teamName', text: '팀명'},
  {dataName: 'played', text: '경기'},
  {dataName: 'win', text: '승'},
  {dataName: 'draw', text: '무'},
  {dataName: 'lose', text: '패'},
  {dataName: 'goalsFor', text: '득점'},
  {dataName: 'goalsAgainst', text: '실점'},
  {dataName: 'goalsDiff', text: '득실차'},
  {dataName: 'points', text: '승점'},
  {dataName: 'form', text: '최근 5경기'},
];

const StandingTable = ({ standings, leagueId, orderType, setOrderType }) => {
  return (
    <Table>
      <caption>{getLeagueNameKr(leagueId)} 순위표</caption>
      <thead>
        <tr>
          { columns.map((column) => 
            <StandingTableTh key={`th_${column.dataName}`} dataName={column.dataName} text={column.text} orderType={orderType} setOrderType={setOrderType} />
          )}
        </tr>
      </thead>
      <tbody>
        { standings.map((teamData) => 
          <StandingTableTr key={`team_${teamData.team.id}`} teamData={teamData} />
        )}
      </tbody>
    </Table>    
  );
}

export default StandingTable;