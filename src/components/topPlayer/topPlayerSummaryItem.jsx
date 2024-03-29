import React from "react";
import styled from "styled-components";

import { DummyTeamLogo } from "../icons/footballIcons";

const TopPlayerSummaryItem = ({ data, type }) => {
  return (
    <SummaryItem>
      {/* <Logo src={data.statistics[0].team.logo} /> */}
      <DummyTeamLogoCustom size="20px" />
      <Name>{data.player.name}</Name>
      <Stat>
        { type === 'goals' 
            ? `${data.statistics[0].goals.total} 골`
            : `${data.statistics[0].goals.assists} 도움`
        }
      </Stat>
    </SummaryItem>
  );
}

const SummaryItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 15px;
  & + li {
    margin-top: 6px;
  }
`;

// const Logo = styled.img`
//   width: 20px;
//   margin-right: 10px;
// `;

const DummyTeamLogoCustom = styled(DummyTeamLogo)`
  margin-right: 10px;
`;

const Name = styled.span`
  flex: 1 1 auto;
`;

const Stat = styled.span`
  width: 60px;
  text-align: right;
`;

export default TopPlayerSummaryItem;