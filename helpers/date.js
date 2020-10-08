const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function idDateFormat(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

function getDaysGap(date) {
  if (!date) return 1;

  const a = new Date(date);
  const b = new Date();

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

module.exports = { idDateFormat, getDaysGap };
