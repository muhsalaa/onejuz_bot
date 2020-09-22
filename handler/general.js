function start(msg, bot) {
  const { first_name, last_name } = msg.from;

  bot.sendMessage(
    msg.chat.id,
    `Ahlan wa Sahlan *${first_name} ${last_name}* di Bot One Day One Juz, semoga istiqomah \u{1F603}.`,
    { parse_mode: 'Markdown' }
  );
}

module.exports = { start };
