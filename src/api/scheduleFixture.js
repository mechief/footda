import footdaApi from "./api";
import dayjs from "dayjs";

import { MissingRequiredParamError, InvalidParamError } from "../errors/validationError";
import { NoResultError } from "../errors/footballAPIError";

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

export const getScheduleFixturesByIds = async (ids) => {
  if (!ids) {
    throw new MissingRequiredParamError('ids');
  }

  if (!Array.isArray(ids)) {
    throw new InvalidParamError('ids');
  }


  if (ids.length === 0) {
    return [];
  }

  const endPoint = '/schedule-fixtures/ids/' + ids.join('-');

  const res = await footdaApi(endPoint);

  if (res.data.results === 0) {
    throw new NoResultError;
  }

  const fixtures = res.data.datas;

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

export const getScheduleCountOfMonth = async (date, endDate) => {
  if (!date) {
    throw new MissingRequiredParamError('date');
  }
  if (!endDate) {
    throw new MissingRequiredParamError('endDate');
  }

  const res = await footdaApi('/schedule-fixtures/count', {
    date: date,
    endDate: endDate,
  });

  if (res.status !== 200) {
    throw new Error;
  }

  return res.data;
}