exports.formatDate = (timeStamp, type) => {
  var date = new Date(timeStamp);
  date.setTime(timeStamp + (date.getTimezoneOffset() + 480) * 60 * 1000);
  var year = date.getFullYear();
  var month = (date.getMonth() + 1);
  month = month < 10 ? ('0' + month) : month;
  var day = date.getDate();
  day = day < 10 ? ('0' + day) : day;
  if (type === 'split') {
    return year + '/' + month + '/' + day;
  } else if (type === 'ch') {
    return year + '年' + month + '月' + day + '日';
  } else {
    var time = new Date().getTime() - date.getTime();
    if (time < 0) {
      return '';
    } else if (time / 1000 < 60) {
      return '刚刚';
    } else if ((time / 60000) < 60) {
      return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
      return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
      return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
      return parseInt(time / 2592000000) + '月前';
    } else {
      return parseInt(time / 31536000000) + '年前';
    }
  }
};

exports.formatNum = num => {
  if (num === undefined || (typeof num !== 'number') || num === 0) {
    return '-';
  }
  if (Math.abs(num) <= 10000) {
    return num;
  } else if (Math.abs(num) <= 100000000) {
    return Math.round(num / 1000) / 10 + '万';
  } else {
    return Math.round(num / 10000000) / 10 + '亿';
  }
};
