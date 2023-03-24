import { useQuery } from "@tanstack/react-query";

import { getTopPlayers } from "../../apiFootball/topPlayers"

// 기본값: 프리미어 리그
export const useTopPlayer = (leagueId) => {
  return useQuery({
    queryKey: ['topPlayers', leagueId],
    queryFn: async () => getTopPlayers(leagueId),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    suspense: true,
  });
}