import footdaApi from "./api";

import { PropertyRequiredError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

export const getScheduleFixtures = async ({ date, endDate } = {}) => {
  if (!date) {
    const now = new Date();
    date = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  }

  const res = await footdaApi('/scheduleFixtures', {
    date: date,
    endDate: endDate,
  });

  if (res.data.results === 0) {
    throw new NoResultError;
  }

  const fixtures = res.data.datas;

  // 경기일자 기준으로 재정렬
  fixtures.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp);

  return fixtures;
}