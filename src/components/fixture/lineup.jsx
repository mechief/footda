import React, { useState, useMemo, useEffect, memo } from "react";
import styled from "styled-components";

import LineupPlayer from "./lineupPlayer";

import { LineupWrapper } from "./fixtureStyled";

const playerEventDefault = {goal: 0, assist: 0, yellow: false, red: false};

const Lineup = memo(({ lineup, events }) => {
  const [playingLineup, setPlayingLineup] = useState([]);
  const [substLineup, setSubstLineup] = useState([]);
  const [substOutLineup, setSubstOutLineup] = useState([]);
  // const [eventVars, setEventVars] = useState([]);
  const [playerEvents, setPlayerEvents] = useState({});
  const [substTimes, setSubstTimes] = useState({in: {}, out: {}});

  const [eventSubsts, eventGoals, eventCards] = useMemo(() => {
    const substs = [];
    const goals = [];
    const cards = [];

    events.forEach(v => {
      if (v.type === 'subst') substs.push(v);
      else if (v.type === 'Card') cards.push(v);
      else if (v.type === 'Goal' && v.comments !== 'Penalty Shootout') goals.push(v);
    });
    
    return [substs, goals, cards];
  }, [events]);

  // 선수 교체 반영
  useEffect(() => {
    if (eventSubsts.length === 0) return;

    const arrSubstOutIds = [];
    const arrSubstInIds = [];
    const newSubstTimes = {in: {}, out: {}};

    eventSubsts.forEach(substEvent => {
      arrSubstOutIds.push(substEvent.player.id);
      arrSubstInIds.push(substEvent.assist.id);

      newSubstTimes.in[substEvent.assist.id] = substEvent.time.elapsed + (substEvent.time.extra ? '+' + substEvent.time.extra : '');
      newSubstTimes.out[substEvent.player.id] = substEvent.time.elapsed + (substEvent.time.extra ? '+' + substEvent.time.extra : '');
    });

    setSubstLineup(lineup.substitutes.filter((v) => !arrSubstInIds.includes(v.player.id)).sort(sortByPosition));
    setSubstOutLineup([...lineup.startXI, ...lineup.substitutes].filter(v => arrSubstOutIds.includes(v.player.id)).sort(sortByPosition));
    setPlayingLineup([...lineup.startXI, ...lineup.substitutes.filter((v) => arrSubstInIds.includes(v.player.id))].filter(v => !arrSubstOutIds.includes(v.player.id)).sort(sortByPosition));
    setSubstTimes(newSubstTimes);
  }, [eventSubsts]);

  // 득점, 도움, 경고, 퇴장 반영
  useEffect(() => {
    setPlayerEvents(() => {
      let playerEvent = {};

      eventGoals.forEach(v => {
        playerEvent[v.player.id] = playerEvent[v.player.id] ?? {...playerEventDefault};
        playerEvent[v.player.id].goal++;

        if (v.assist.id) {
          playerEvent[v.assist.id] = playerEvent[v.assist.id] ?? {...playerEventDefault};
          playerEvent[v.assist.id].assist++;
        }
      });

      eventCards.forEach(v => {
        playerEvent[v.player.id] = playerEvent[v.player.id] ?? {...playerEventDefault};

        if (v.detail === 'Yellow Card') {
          playerEvent[v.player.id].yellow = true;
        } else if (v.detail === 'Red Card') {
          playerEvent[v.player.id].red = true;
        }
      });

      return playerEvent;
    });
  }, [eventGoals, eventCards]);

  const sortByPosition = (a, b) => {
    const order = ['G', 'D', 'M', 'F'];
    return order.indexOf(a.player.pos) - order.indexOf(b.player.pos);
  }

  return (
    <LineupWrapper>
      <LineupTitle>라인업</LineupTitle>
      { playingLineup.map(v => 
        <LineupPlayer key={v.player.id} player={v.player} playerEvent={playerEvents[v.player.id]} substTimes={substTimes} />
      )}
      <LineupSubstTitle>교체 명단</LineupSubstTitle>
      { substLineup.map(v => 
        <LineupPlayer key={v.player.id} player={v.player} />
      )}
      { substOutLineup.map(v => 
        <LineupPlayer key={v.player.id} player={v.player} playerEvent={playerEvents[v.player.id]} substTimes={substTimes} isSubstOut={true} />
      )}
    </LineupWrapper>
  );
});

const LineupTitle = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`;

const LineupSubstTitle = styled(LineupTitle)`
  padding-top: 10px;
`;

export default Lineup;