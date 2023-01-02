import React, { useState, useEffect, memo } from "react";
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
  const [eventSubsts, setEventSubsts] = useState([]);
  const [eventGoals, setEventGoals] = useState([]);
  const [eventCards, setEventCards] = useState([]);
  // const [eventVars, setEventVars] = useState([]);
  const [playerEvents, setPlayerEvents] = useState({});

  // 이벤트를 종류별로 분할
  useEffect(() => {
    setEventGoals(() => {
      return events.filter(v => {
        return v.type === 'Goal';
      });
    });
    setEventSubsts(() => {
      return events.filter(v => {
        return v.type === 'subst';
      });
    });
    setEventCards(() => {
      return events.filter(v => {
        return v.type === 'Card';
      });
    });
    /*
    setEventVars(() => {
      return events.filter(v => {
        return v.type === 'Var';
      });
    });    
    */
  }, [events]);

  // 선수 교체 반영
  useEffect(() => {
    let newPlayingLineup = [...lineup.startXI];
    let newSubstLineup = [...lineup.substitutes];
    let newSubstOutLineup = [];
    let subInIndex, subOut;

    eventSubsts.forEach(substEvent => {
      subInIndex = lineup.substitutes.findIndex(substPlayer => {
        return substPlayer.player.id === substEvent.assist.id; // subst in (assist: 투입 선수)
      });
      subOut = newPlayingLineup.splice(newPlayingLineup.findIndex(v => {
        return v.player.id === substEvent.player.id; // subst out
      }), 1, lineup.substitutes[subInIndex]);

      newSubstLineup.splice(subInIndex, 1);
      newSubstOutLineup.push(subOut[0]);
    });

    setPlayingLineup(() => newPlayingLineup);
    setSubstLineup(() => newSubstLineup);
    setSubstOutLineup(() => newSubstOutLineup);
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
        {substLineup.length > 0 && (
          <>
            {substLineup.map(v => 
              <LineupPlayer key={v.player.id} player={v.player} />
            )}
            {substOutLineup.map(v => 
              <LineupPlayer key={v.player.id} player={v.player} playerEvent={playerEvents[v.player.id]} isSubstOut={true} />
            )}
            <LineupPlayer key='test' player={{id: 2398761085183, pos: 'M', number: 98, name: '위젯에러 테스트용 선수'}} />
          </>
        )}
      </LineupSubst>
    </LineupWrapper>
  );
});

export default Lineup;