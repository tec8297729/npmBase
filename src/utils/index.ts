export const formatDate = (dateTime: Date, fmt: string | undefined) => {
  if (!dateTime) return ''; // 传入参数不存在时退出
  const o = {
    'M+': dateTime.getMonth() + 1, // 月份
    'd+': dateTime.getDate(), // 日
    'h+': dateTime.getHours(), // 小时
    'm+': dateTime.getMinutes(), // 分
    's+': dateTime.getSeconds(), // 秒
    'q+': Math.floor((dateTime.getMonth() + 3) / 3), // 季度
    S: dateTime.getMilliseconds(), // 毫秒
  };
  let newDataStrin = fmt || 'yyyy-MM-dd hh:mm:ss.S';
  if (/(y+)/.test(newDataStrin)) {
    newDataStrin = newDataStrin.replace(
      RegExp.$1,
      `${dateTime.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  // eslint-disable-next-line
  for (const k in o) {
    if (new RegExp(`(${k})`).test(newDataStrin)) {
      newDataStrin = newDataStrin.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  }
  return newDataStrin;
};
