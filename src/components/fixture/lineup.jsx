import React, { useState, useMemo, useEffect, memo } from "react";
import styled from "styled-components";

import LineupPlayer from "./lineupPlayer";

import { LineupWrapper } from "./fixtureStyled";

const LineupSubst = styled.div`
  margin-top: 40px;
`;

const playerEventDefault = {goal: 0, assist: 0, yellow: false, red: false};

const Lineup = memo(({ lineup, events }) => {
  const [playingLineup, setPlayingLineup] = useState([]);
  const [substLineup, setSubstLineup] = useState([]);
  const [substOutLineup, setSubstOutLineup] = useState([]);
  // const [eventVars, setEventVars] = useState([]);
  const [playerEvents, setPlayerEvents] = useState({});

  const eventSubsts = useMemo(() => {
    return events.filter(v => {
      return v.type === 'subst';
    });
  }, [events]);
  
  const eventGoals = useMemo(() => {
    return events.filter(v => {
      return v.type === 'Goal' && v.comments !== 'Penalty Shootout';
    });
  }, [events]);

  const eventCards = useMemo(() => {
    return events.filter(v => {
      return v.type === 'Card';
    });
  }, [events]);

  // 선수 교체 반영
  useEffect(() => {
    if (eventSubsts.length === 0) return;

    const arrSubstOutIndex = [];
    const arrSubstInIndex = [];

    eventSubsts.forEach(substEvent => {
      const substOutIndex = lineup.startXI.findIndex(v => {
        return v.player.id === substEvent.player.id; // subst out
      });
      const substInIndex = lineup.substitutes.findIndex(substPlayer => {
        return substPlayer.player.id === substEvent.assist.id; // subst in (assist: 투입 선수)
      });

      arrSubstOutIndex.push(substOutIndex);
      arrSubstInIndex.push(substInIndex);
    });

    setSubstOutLineup(lineup.startXI.filter((_, i) => arrSubstOutIndex.includes(i)));
    setSubstLineup(lineup.substitutes.filter((_, i) => !arrSubstInIndex.includes(i)));
    setPlayingLineup([
      ...lineup.startXI.filter((_, i) => !arrSubstOutIndex.includes(i)),
      ...lineup.substitutes.filter((_, i) => arrSubstInIndex.includes(i))
    ]);
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

  return (
    <LineupWrapper>
      <div>
        {playingLineup.map(v => 
          <LineupPlayer key={v.player.id} player={v.player} playerEvent={playerEvents[v.player.id]} />
        )}
      </div>
      <LineupSubst>
        <p>교체 명단</p>
        { substLineup.map(v => 
          <LineupPlayer key={v.player.id} player={v.player} />
        )}
        { substOutLineup.map(v => 
          <LineupPlayer key={v.player.id} player={v.player} playerEvent={playerEvents[v.player.id]} isSubstOut={true} />
        )}
      </LineupSubst>
    </LineupWrapper>
  );
});

export default Lineup;