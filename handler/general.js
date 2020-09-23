const User = require('../models/user');

function start(msg, bot) {
  bot.sendMessage(
    msg.chat.id,
    `Bismillah, mari memulai tilawah 1 juz perhari, semoga istiqomah \u{1F603}.`,
    { parse_mode: 'Markdown' }
  );
}

async function welcome(msg, bot) {
  const { id: user_id, first_name, last_name, username } = msg.new_chat_member;
  const { id, title } = msg.chat;

  const user = await User.findOne({ user_id });

  if (user) {
    bot.sendMessage(
      id,
      `Ahlan wa Sahlan, selamat datang kembali *${user.name}* di grup odoj *${title}*`,
      { parse_mode: 'Markdown' }
    );
  } else {
    await User.create({
      name: `${first_name} ${last_name}`.trim(),
      user_id,
      username: `@${username}`,
      group_id: id,
    });

    bot.sendMessage(
      id,
      `Ahlan wa Sahlan *${first_name} ${last_name}* di grup odoj *${title}*`,
      { parse_mode: 'Markdown' }
    );
  }
}

async function changeName() {}

module.exports = { start, welcome };
