// emoji list of user reporting status
const {
  openBook,
  notReport,
  notReportOnce,
  notReportTwice,
  notReportMore,
  checkMark,
} = require('../consts/emoji');

// qur'an 30 Juz list
// prettier-ignore
const juz = [
  1,2,3,4,5,6,7,8,9,10,
  11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30
];

// helper object to determine times user not reporting
const recordSymbol = {
  0: checkMark,
  1: notReport,
  2: notReportOnce,
  3: notReportTwice,
  4: notReportMore,
};

/**
 * Generate string of user daily read report
 * @param {Object} member - user data
 * @param {Number} gap - gap of last read time with current time in days
 *
 * @return {String}
 */
function memberReportGenerator(member, gap) {
  const { last_juz_read, name } = member;

  // return default if this is user first time report.
  if (!last_juz_read) {
    return `${openBook} XX ${notReport} ${name}\n`;
  }

  // return user read report based on day gap between last time user reported
  if (gap === 0) {
    const lastRead = last_juz_read.toString().padStart(2, '0');
    return `${openBook} ${lastRead} ${checkMark} ${name}\n`;
  } else {
    return `${openBook} XX ${recordSymbol[gap] || notReportMore} ${name}\n`;
  }
}

/**
 * Generate string of user weekly read report
 * @param {Object} member - user data
 * @param {Array} record - array of user not reporting record in a week
 *
 * @return {String}
 */
function memberWeeklyReportGenerator(member, records) {
  const emojiRecords = records.map(
    (record) => recordSymbol[record] || notReportMore
  );
  const userRecord = emojiRecords.join('');
  return `${userRecord} ${member.name}\n`;
}

/**
 * Helper to check if juz reported by user is in range, between 1-30
 * @param {Array} juzArray - list of juz read by user
 *
 * @return {Boolean}
 */
function isInRange(juzArray) {
  return juzArray.every((x) => juz.includes(x));
}

/**
 * Helper to check if juz read by user is sequesntial, i.e 23 24 25, or 30 1 2
 * @param {Array} juzArray - list of juz read by user
 *
 * @return {Boolean}
 */
function isSequential(juzArray) {
  for (let x = 1; x < juzArray.length; x++) {
    let gap = Math.abs(juzArray[x - 1] - juzArray[x]);
    if (gap !== 1 && gap !== 29) {
      return false;
    }
  }

  return true;
}

/**
 * Helper to check the last juz read by user is continous with last report, i.e 20 then 21
 * @param {Number} lastRead - last juz read by user
 * @param {Array} currentRead - list of juz read by user
 *
 * @return {Boolean}
 */
function lastJuzReadContinue(lastRead, currentRead) {
  if (
    lastRead + 1 === currentRead[0] ||
    (lastRead === 30 && currentRead[0] === 1)
  ) {
    return true;
  }

  return false;
}

/**
 * Helper to create new sequential record object used to change record after user update his report
 * @param {Number} today - number of day user updated his report
 *
 * @return {Object}
 */
function recordNormalizer(today) {
  const data = {};
  for (let x = 1; x < 7 - today; x++) {
    data[today + x] = x;
  }
  return data;
}

/**
 * Helper to reset record at end of the week
 * if user not reported 3 times at last week, this helper will return
 * object contain continued number from it
 * @param {Number} last - last record value (key 6, indicating sturday)
 *
 * @return {Object} - i.e {0: 4, 1: 5 ... }
 */
function recordReset(last) {
  const arr = Array.from({ length: 7 }, (_, i) => i + last + 1);
  return Object.assign({}, arr);
}

module.exports = {
  isInRange,
  isSequential,
  lastJuzReadContinue,
  memberReportGenerator,
  memberWeeklyReportGenerator,
  recordNormalizer,
  recordReset,
};
