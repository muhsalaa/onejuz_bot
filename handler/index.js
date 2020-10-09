// handler
const {
  start,
  welcome,
  register,
  rename,
  restart,
  remove,
} = require('./general');
const { handleJuzReport } = require('./report');
const { dailyStatisticGenerator } = require('./statistics');
const { botSend } = require('../helpers');

const { INVALID_INPUT } = require('../consts/response');

async function oneJuzBot(msg, bot) {
  const juzValue = msg.text.match(/\d+/g);
  let response;

  // handle juz report
  if (juzValue) {
    response = await handleJuzReport(msg, juzValue);
  }

  // get statistics
  else if (msg.text === '/statistics') {
    response = await dailyStatisticGenerator(msg);
  }

  // start handler
  else if (msg.text === '/start') {
    response = await start(msg);
  }

  // register admin
  else if (msg.text === '/register') {
    response = await register(msg, bot);
  }

  // restart read
  else if (msg.text === '/restart ulangi bacaan') {
    response = await restart(msg, bot);
  }

  // rename user
  else if (/\/rename [A-Za-z ]+/.test(msg.text)) {
    response = await rename(msg);
  }

  // unhandled case
  else {
    response = { target: msg.chat.id, message: INVALID_INPUT };
  }

  botSend(bot, response);
}

module.exports = {
  oneJuzBot,
  welcome,
  remove,
};
