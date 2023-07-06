import { useQuery } from "@tanstack/react-query";

import { getScheduleCountOfMonth } from "../../api/scheduleFixture";

const useScheduleCounts = (focusDayjsObj) => {
  return useQuery({
    queryKey: ['scheduleCountOfMonth', focusDayjsObj.format('YYYY-MM')],
    queryFn: async () => getScheduleCountOfMonth(
      focusDayjsObj.startOf('month').format('YYYY-MM-DD'),
      focusDayjsObj.endOf('month').format('YYYY-MM-DD')
    ),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
}

export default useScheduleCounts;