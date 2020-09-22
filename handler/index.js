const { mainButton } = require('../components/buttons');
const { inRange } = require('../helpers');

// handler
const { start } = require('./general');
const { handleSingleJuzReport, handleMultipleJuzReport } = require('./report');

module.exports.oneJuzBot = (msg, bot) => {
  const juz = parseInt(msg.text);
  const juzMultiple = msg.text.match(/\d+/g);

  // start handler
  if (msg.text === '/start') {
    start(msg, bot);
  }

  // single juz handler
  else if (inRange(juz)) {
    handleSingleJuzReport(msg, bot, juz);
  }

  // multiple juz handler
  else if (juzMultiple) {
    handleMultipleJuzReport(msg, bot, juzMultiple);
  }

  // unhandled case
  else {
    bot.sendMessage(msg.chat.id, 'Input tidak valid');
  }
};
