import footballApi from "../apiFootball/api";

export const getCurrentRound = async ({league, season}) => {
  if (league === undefined || season === undefined) {
    throw new Error('라운드 정보 파라미터 부족');
  }

  const res = await footballApi('/fixtures/rounds', {
    league: league,
    season: season,
    current: true,
  });

  return res.data.results > 0 ? res.data.response[0] : false;
}