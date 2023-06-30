import footdaApi from "../api/api";

import { MissingRequiredParamError } from "../errors/validationError";
import { NotFoundError } from "../errors/footballAPIError";

export const getFixture = async (fixtureId) => {
  if (!fixtureId) {
    throw new MissingRequiredParamError('fixtureId');
  }
  
  const res = await footdaApi('/fixtures/' + fixtureId);
  
  if (res.data.results === 0) {
    throw new NotFoundError;
  }

  return res.data.response[0];
}