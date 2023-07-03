import footballApi from "./api";

import { NoResultError } from "../errors/footballAPIError";

export const getLeagues = async () => {
  try {
    const res = await footballApi('/leagues', {
      type: 'cup',
    });

    if (res.data.results === 0) {
      throw new NoResultError;
    }

    return res.data.response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
