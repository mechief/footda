export const positionTo2Char = (position) => {
  const arrPosition = ['GK', 'DF', 'MF', 'FW'];
  
  return arrPosition.find(v => {
    return v[0] === position[0];
  });
}

export const getFormattedRound = (round) => {
  let formattedRound = round;

  if (round.includes('Regular Season')) {
    formattedRound = round.substring(round.indexOf('-') + 1).trim() + 'R';
  } else if (round === 'Knockout Round Play-offs') {
    formattedRound = '토너먼트 P/O';
  } else if (round === 'Quarter-finals') {
    formattedRound = '8강';
  } else if (round === 'Semi-finals') {
    formattedRound = '준결승';
  } else if (round === 'Final') {
    formattedRound = '결승';
  } else if (/Round of \d+/i.test(round)) {
    formattedRound = round.replace('Round of ', '') + '강';
  }

  return formattedRound;
}

export const getTeamLogoURL = (teamId) => {
  return `https://media.api-sports.io/football/teams/${teamId}.png`;
}