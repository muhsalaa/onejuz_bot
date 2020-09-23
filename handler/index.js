// handler
const { start, welcome } = require('./general');
const { handleJuzReport } = require('./report');

function oneJuzBot(msg, bot) {
  const juzValue = msg.text.match(/\d+/g);

  // start handler
  if (msg.text === '/start') {
    start(msg, bot);
  }

  // handle juz report
  else if (juzValue) {
    handleJuzReport(msg, bot, juzValue);
  }

  // unhandled case
  else {
    bot.sendMessage(msg.chat.id, 'Input tidak valid');
  }
}

module.exports = {
  oneJuzBot,
  welcome,
};
