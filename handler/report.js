const User = require('../models/user');
const { isInRange, isSequential, lastJuzReadContinue } = require('../helpers');
const {
  JUZ_REPORT,
  JUZ_REPORT_ERROR,
  JUZ_REPORT_NOT_CONTINUES,
  INVALID_INPUT,
} = require('../consts/response');

/**
 * Global handler for juz single or multiple read report
 * @param {Array} juzMultiple - array of number of juz member read
 */
async function handleJuzReport(msg, bot, juzMultiple) {
  const juzArray = juzMultiple.map(Number);
  const { id: user_id } = msg.from;

  const user = await User.findOne({ user_id });

  // check if juz read are valid
  if (!isInRange(juzArray)) {
    bot.sendMessage(msg.chat.id, INVALID_INPUT);
    return false;
  }

  // check if juz read is sequential
  if (!isSequential(juzArray)) {
    bot.sendMessage(msg.chat.id, JUZ_REPORT_ERROR);
    return false;
  }

  // if user is first time reporting
  if (!user.last_juz_read) {
    sendSuccessResponse(msg, user, user_id, juzArray);
    return true;
  }

  // check if last juz read is continous
  const { last_juz_read } = user;
  if (!lastJuzReadContinue(last_juz_read, juzArray)) {
    bot.sendMessage(
      msg.chat.id,
      JUZ_REPORT_NOT_CONTINUES(last_juz_read, juzArray[0]),
      {
        parse_mode: 'Markdown',
      }
    );

    return false;
  }

  sendSuccessResponse(msg, bot, user, user_id, juzArray);
}

async function sendSuccessResponse(msg, bot, user, user_id, juzArray) {
  await User.updateOne(
    { user_id },
    {
      last_juz_read: juzArray[juzArray.length - 1],
      $inc: { khatam: juzArray.includes(30) ? 1 : 0 },
      last_juz_report: new Date().toISOString(),
    }
  );

  bot.sendMessage(msg.chat.id, JUZ_REPORT(user.name, juzArray.join(', ')), {
    parse_mode: 'Markdown',
  });
}

module.exports = { handleJuzReport };
