export const positionTo2Char = (position) => {
  const arrPosition = ['GK', 'DF', 'MF', 'FW'];
  
  return arrPosition.find(v => {
    return v[0] === position[0];
  });
}

export const getTeamLogoURL = (teamId) => {
  return `https://media.api-sports.io/football/teams/${teamId}.png`;
}