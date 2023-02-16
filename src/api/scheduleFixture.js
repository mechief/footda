import footdaApi from "./api";
import dayjs from "dayjs";

import { NoResultError } from "../errors/footballAPIError";
import { InvalidParamError } from "../errors/validationError";

export const getScheduleFixtures = async ({ date, endDate } = {}) => {
  if (!date) {
    date = dayjs().format('YYYY-MM-DD');
  }

  const res = await footdaApi('/schedule-fixtures', {
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

export const getFirstExistsDate = async (date) => {
  if (date && !dayjs(date).isValid()) {
    throw new InvalidParamError('date');
  }

  const res = await footdaApi('/schedule-fixtures/first-exists-date', {
    date: date,
  });
  
  if (!res.data) {
    throw new NoResultError;
  }

  return res.data;
}