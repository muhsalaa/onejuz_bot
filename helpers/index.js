function inRange(x) {
  if (typeof x !== 'number') return false;
  return x > 0 && x <= 30;
}

function isInRange(juzArray) {
  return !juzArray.map(inRange).includes(false);
}

function isSequential(juzArray) {
  const sorted = juzArray.sort((a, b) => a - b);
  for (let x = 0; x < sorted.length - 1; x++) {
    if (sorted[x + 1] - sorted[x] > 1) {
      return false;
    }
  }

  return true;
}

module.exports = { inRange, isInRange, isSequential };
