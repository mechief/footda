import footdaApi from "./api";
import dayjs from "dayjs";

import { PropertyRequiredError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

export const getScheduleFixtures = async ({ date, endDate } = {}) => {
  if (!date) {
    date = dayjs().format('YYYY-MM-DD');
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