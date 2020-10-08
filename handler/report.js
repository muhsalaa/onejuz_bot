const User = require('../models/user');
const { isInRange, isSequential, lastJuzReadContinue } = require('../helpers');
const {
  JUZ_REPORT,
  JUZ_REPORT_ERROR,
  JUZ_REPORT_NOT_CONTINUES,
  INVALID_INPUT,
} = require('../consts/response');

/**
 * Global handler for single or multiple juz read report
 * @param {Array} juzMultiple - array of number of juz member read
 */
async function handleJuzReport(msg, juzMultiple) {
  const juzArray = juzMultiple.map(Number);
  const { id: user_id } = msg.from;

  const user = await User.findOne({ user_id });

  // check if juz read are valid
  if (!isInRange(juzArray)) {
    return { target: msg.chat.id, message: INVALID_INPUT };
  }

  // check if juz read is sequential
  if (!isSequential(juzArray)) {
    return { target: msg.chat.id, message: JUZ_REPORT_ERROR };
  }

  // if user is first time reporting
  if (!user.last_juz_read) {
    return sendSuccessResponse(msg, user, user_id, juzArray);
  }

  // check if last juz read is continous
  const { last_juz_read } = user;
  if (!lastJuzReadContinue(last_juz_read, juzArray)) {
    return {
      target: msg.chat.id,
      message: JUZ_REPORT_NOT_CONTINUES(last_juz_read, juzArray[0]),
    };
  }

  return sendSuccessResponse(msg, user, user_id, juzArray);
}

async function sendSuccessResponse(msg, user, user_id, juzArray) {
  await User.updateOne(
    { user_id },
    {
      last_juz_read: juzArray[juzArray.length - 1],
      $inc: { khatam: juzArray.includes(30) ? 1 : 0 },
      last_juz_report: new Date().toISOString(),
    }
  );

  return {
    target: msg.chat.id,
    message: JUZ_REPORT(user.name, juzArray.join(', ')),
  };
}

module.exports = { handleJuzReport };
