// milisecond in a day
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Convert date to date string Indonesian format, i.e Senin, 20 September 2020
 * @param {Date} date
 *
 * @return {String}
 */
function idDateFormat(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

/**
 * Convert date to date string Indonesian format, short mode, i.e 20 Sep 2020
 * @param {Date} date
 *
 * @return {String}
 */
function shortDateFormat(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * get last week sunday date
 *
 * @return {Date}
 */
function getSunday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
}

/**
 * get days gap between two data
 * @param {Date} date
 * @param {Date} target
 *
 * @return {Number}
 */
function getDaysGap(date, target) {
  if (!date) return 1;

  const a = new Date(date);
  const b = target || new Date();

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

/**
 * Helper to get today's days number , Sunday is 0, Saturday is 6
 */
function today() {
  return new Date().getDay();
}

module.exports = {
  idDateFormat,
  getDaysGap,
  today,
  getSunday,
  shortDateFormat,
};
