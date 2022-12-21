export const getDataByPromise = (action, ...actionParams) => {
  if (typeof action !== 'function') {
    throw new Error('action 파라미터는 함수여야 합니다.');
  }
  return new Promise(async (resolve, reject) => {
    try {
      const actionResult = await action(...actionParams);
      resolve(actionResult);
    } catch (err) {
      reject();
    }
  });
}