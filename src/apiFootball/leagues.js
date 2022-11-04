import footballApi from "../apiFootball/api";

export const CURRENT_LEAGUE = 39 // 프리미어리그

export const getLeagues = () => {
  return footballApi('/leagues', {
    // code: 'DE',
    // country: 'World',
    // type: 'cup',
  });
}