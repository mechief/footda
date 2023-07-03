import React, { useMemo } from "react";
import styled from "styled-components";

import { getLeagueNameKr, getLeagueRule } from "../../utils/league";

import StandingTableTh from "./standingTableTh";
import StandingTableTr from "./standingTableTr";

const Table = styled.table`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0 2px;
  & th,
  & td {
    text-align: center;
  }
  & th {
    background: #e5eef0;
    font-size: 14px;
    font-weight: 500;
  }
  & td {
    padding: 6px 12px;
    font-size: 13px;
  }
  tbody tr:nth-child(odd) td {
    background: #fafafa;
  }
  tbody tr:nth-child(even) td {
    background: #f5f5f5;
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

const StandingTable = ({ 
  standings, 
  leagueId, 
  orderType, 
  setOrderType, 
}) => {
  const leagueRule = useMemo(() => {
    return getLeagueRule(leagueId);
  }, []);

  return (
    <Table>
      <caption>{getLeagueNameKr(leagueId)} 순위표</caption>
      <thead>
        <tr>
          { columns.map((column) => 
            <StandingTableTh 
              key={`th_${column.dataName}`} 
              dataName={column.dataName} 
              text={column.text} 
              orderType={orderType} 
              setOrderType={setOrderType}
            />
          )}
        </tr>
      </thead>
      <tbody>
        { standings.map((teamData) => 
          <StandingTableTr 
            key={`team_${teamData.team.id}`} 
            teamData={teamData} 
            leagueRule={leagueRule}
          />
        )}
      </tbody>
    </Table>    
  );
}

export default StandingTable;