function getName(user) {
  const name = [user.first_name, user.last_name].filter(Boolean);
  return name.join(' ').trim();
}

function notStartedWith(string, data) {
  const checkStringContent = data.map((x) => string.startsWith(x));
  return checkStringContent.filter(Boolean).length === 0;
}

module.exports = { getName, notStartedWith };
