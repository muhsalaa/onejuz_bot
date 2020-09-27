// prettier-ignore
const juz = [
  1,2,3,4,5,6,7,8,9,10,
  11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30
];

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

module.exports = { isInRange, isSequential, lastJuzReadContinue };
