/**
 * Helper function to send message to group
 * @param {Object} bot - bot module object
 * @param {Object} response - contains message and address to send it
 * @param {Object} config - config for message response to group, i.e { parse_mode: 'Markdown' }
 */
function botSend(bot, response, config = { parse_mode: 'Markdown' }) {
  const { target, message } = response;
  bot.sendMessage(target, message, config);
}

module.exports = { botSend };
