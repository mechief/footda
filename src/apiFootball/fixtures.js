import footballApi from "../apiFootball/api";
import { FOOTBALL_API_TIMEZONE } from "../constants";

import { MissingRequiredParamError } from "../errors/validationError";
import { NoResultNotFoundError } from "../errors/footballAPIError";

export const getFixture = async (fixtureId) => {
  if (!fixtureId) {
    throw new MissingRequiredParamError('fixtureId');
  }
  
  const res = await footballApi('/fixtures', {
    id: fixtureId,
    timezone: FOOTBALL_API_TIMEZONE,
  });
  
  if (res.data.results === 0) {
    throw new NoResultNotFoundError;
  }

  return res.data.response[0];
}