function getName(user) {
  const name = [user.first_name, user.last_name].filter(Boolean);
  return name.join('').trim();
}

module.exports = { getName };
