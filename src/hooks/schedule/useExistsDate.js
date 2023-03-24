import { useInfiniteQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getFirstExistsDate } from "../../api/scheduleFixture";

const fetchFirstExistsDate = ({ pageParam = undefined }) => getFirstExistsDate(pageParam);

export const useExistsDate = () => {
  return useInfiniteQuery(['fixturesDates'], fetchFirstExistsDate, {
    getNextPageParam: (lastPage, allPages) => dayjs(lastPage).add(1, 'day').format('YYYY-MM-DD'),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
}