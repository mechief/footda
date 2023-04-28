import footdaApi from "./api";

const defaultLang = 'ko-kr';

export const getLangTeams = async (lang = defaultLang) => {
  const res = await footdaApi(`/lang/${lang}/teams`);

  return res.data;
}