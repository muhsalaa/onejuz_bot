// handler
const { start, welcome, register, rename } = require('./general');
const { handleJuzReport } = require('./report');

function oneJuzBot(msg, bot) {
  const juzValue = msg.text.match(/\d+/g);

  // handle juz report
  if (juzValue) {
    handleJuzReport(msg, bot, juzValue);
  }

  // start handler
  else if (msg.text === '/start') {
    start(msg, bot);
  }

  // register admin
  else if (msg.text === '/register') {
    register(msg, bot);
  }

  // register admin
  else if (msg.text === '/register') {
    register(msg, bot);
  }

  // rename user
  else if (/\/rename [A-Za-z ]+/.test(msg.text)) {
    rename(msg, bot);
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
