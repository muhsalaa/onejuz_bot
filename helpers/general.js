/**
 * Helper to get and combine user first and last name
 * and handle if there is missing data
 * @param {Object} user - user data
 *
 * @return {String}
 */
function getName(user) {
  const name = [user.first_name, user.last_name].filter(Boolean);
  return name.join(' ').trim();
}

module.exports = { getName };
