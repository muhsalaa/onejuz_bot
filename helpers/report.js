const {
  openBook,
  notReport,
  notReportOnce,
  notReportTwice,
  notReportMore,
  checkMark,
} = require('../consts/emoji');

// prettier-ignore
const juz = [
  1,2,3,4,5,6,7,8,9,10,
  11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30
];

/**
 * Generate string of current user read statistics
 * @param {object} member - user data
 * @param {number} gap - gap of last read time with current time in days
 */
function memberReportGenerator(member, gap) {
  const { last_juz_read, name } = member;

  switch (gap) {
    case 0:
      return last_juz_read
        ? `${openBook} ${
            (last_juz_read > 9 ? last_juz_read : '0' + last_juz_read) || 'XX'
          } ${checkMark} ${name}\n`
        : `${openBook} XX ${notReport} ${name}\n`;
    case 1:
      return `${openBook} XX ${notReport} ${name}\n`;
    case 2:
      return `${openBook} XX ${notReportOnce} ${name}\n`;
    case 3:
      return `${openBook} XX ${notReportTwice} ${name}\n`;
    default:
      return `${openBook} XX ${notReportMore} ${name}\n`;
  }
}

function isInRange(juzArray) {
  return juzArray.every((x) => juz.includes(x));
}

function isSequential(juzArray) {
  for (let x = 1; x < juzArray.length; x++) {
    let gap = Math.abs(juzArray[x - 1] - juzArray[x]);
    if (gap !== 1 && gap !== 29) {
      return false;
    }
  }

  return true;
}

function lastJuzReadContinue(lastRead, currentRead) {
  if (
    lastRead + 1 === currentRead[0] ||
    (lastRead === 30 && currentRead[0] === 1)
  ) {
    return true;
  }

  return false;
}

module.exports = {
  isInRange,
  isSequential,
  lastJuzReadContinue,
  memberReportGenerator,
};
