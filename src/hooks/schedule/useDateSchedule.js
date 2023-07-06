import { useQuery } from "@tanstack/react-query";

import { getScheduleFixtures } from "../../api/scheduleFixture";

const useDateSchedule = (date) => {
  return useQuery({
    queryKey: ['fixtures', date],
    queryFn: async () => getScheduleFixtures({date: date}),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
}

export default useDateSchedule;