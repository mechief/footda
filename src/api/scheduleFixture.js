import footdaApi from "./api";
import dayjs from "dayjs";

import { NoResultError } from "../errors/footballAPIError";
import { InvalidParamError } from "../errors/validationError";

import { isServiceLeague } from "../service/apiFootballService";

export const getScheduleFixtures = async ({ date, endDate, leagueId } = {}) => {
  if (!date) {
    date = dayjs().format('YYYY-MM-DD');
  }

  if (leagueId && !isServiceLeague(leagueId)) {
    throw new InvalidParamError('leagueId');
  }

  const endPoint = leagueId
    ? '/schedule-fixtures/leagues/' + leagueId
    : '/schedule-fixtures';

  const res = await footdaApi(endPoint, {
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