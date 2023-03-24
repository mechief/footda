import { useLayoutEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getFixture } from "../../apiFootball/fixtures";
import { setFixtureId, setFixture } from "../../slices/currentFixtureSlice";

export const useFixture = () => {
  const fixtureId = Number(useParams().id);
  const { state: listData } = useLocation();

  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fixture', fixtureId],
    queryFn: async () => getFixture(fixtureId),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
  
  const fixtureData = data ?? listData;

  useLayoutEffect(() => {
    dispatch(setFixtureId(fixtureId));
  }, [fixtureId]);

  useLayoutEffect(() => {
    if (!fixtureData) return;

    dispatch(setFixture(fixtureData));
  }, [fixtureData]);

  // 팀별 events filter
  const teamEvents = useMemo(() => {
    if (!fixtureData?.events) return null;

    return {
      home: fixtureData?.events.filter(v => {
        return v.team.id === fixtureData?.teams.home.id;
      }),
      away: fixtureData?.events.filter(v => {
        return v.team.id === fixtureData?.teams.away.id;
      })
    }
  }, [fixtureData?.events]);

  return {
    isNoInitialLoading: isLoading && !listData,
    isLoading: isLoading,
    isError: isError,
    fixtureData: fixtureData,
    teamEvents: teamEvents,
  }
}