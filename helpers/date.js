const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function idDateFormat(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}

function shortDateFormat(date) {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getSunday() {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff));
}

function getDaysGap(date, target) {
  if (!date) return 1;

  const a = new Date(date);
  const b = target || new Date();

  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

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
