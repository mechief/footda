import React, { useState, useEffect, memo } from "react";

const FixtureSummary = memo(({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState([]);

  // 이벤트를 종류별로 분할
  useEffect(() => {
    setFilteredEvents(() => {
      return events.filter(v => {
        return v.type === 'Goal' || v.detail === 'Red Card';
      });
    });
  }, [events]);

  return (
    <>
      {
        filteredEvents.length > 0 &&
        filteredEvents.map(v => {
          return (
            <div key={`${v.player.id}_${v.time.elapsed}`}>
              <span>{v.time.elapsed}</span>
              <span>{v.player.name}</span>
              {
                v.type === 'Goal' &&
                <span className="goal">골</span>
              }
              {
                v.type === 'Card' && v.detail === 'Red Card' &&
                <span className="red-card">퇴장</span>
              }
            </div>
          )
        })
      }
    </>
  );
});

export default FixtureSummary;