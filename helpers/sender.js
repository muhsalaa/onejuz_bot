function botSend(bot, response, config = { parse_mode: 'Markdown' }) {
  const { target, message } = response;
  bot.sendMessage(target, message, config);
}

module.exports = { botSend };
