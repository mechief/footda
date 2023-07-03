import { FIXTURE_STATUS } from "../constants/fixture";

export const getFixtureStatusCode = (shortStatus) => {
  return FIXTURE_STATUS[shortStatus].code ?? null;
}

export const getFixtureStatusText = (shortStatus) => {
  return FIXTURE_STATUS[shortStatus].text ?? null;
}