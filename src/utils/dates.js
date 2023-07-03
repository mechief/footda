export const dayOfWeekToKR = (dayOfWeek, type = 'short') => {
  const arrKR = ['일', '월', '화', '수', '목', '금', '토'];
  return arrKR[dayOfWeek] + (type === 'long' ? '요일' : '');
}