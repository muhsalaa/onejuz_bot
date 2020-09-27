const User = require('../models/user');
const Group = require('../models/group');

const {
  WELCOME_BACK,
  INVALID_INPUT,
  WELCOME,
  ADMIN_REGISTRATION_SUCCESS,
  ADMIN_REGISTERED,
} = require('../consts/response');

/**
 * Welcome user to bot and show guide
 * - guide not ready yet lol
 */
function start(msg, bot) {
  bot.sendMessage(
    msg.chat.id,
    `*Bismillah*, mari memulai tilawah 1 juz perhari, semoga istiqomah \u{1F603}.
    
Berikut cara laporan tilawah dan fitur bot lain:
1. Untuk laporan satu juz bisa langsung mengetikkan juz yang sudah dibaca, misal *Juz 3 kholas* atau hanya *3* saja.
2. Untuk laporan lebih dari satu juz bisa mengetikkan nomor juz secara berurutan, misal *juz 3, 4 5 kholas* atau hanya angka juz saja seperti *29 30 1 2*. Pastikan ada jeda antara angka juz, baik spasi atau karakter lainya.`,
    { parse_mode: 'Markdown' }
  );
}

/**
 * Register new admin for newly created group
 * - only 1 admin can exist and saved in database
 * - additional admin is possible but not using group admin feature
 * - create new group in database
 */
async function register(msg, bot) {
  const { id: group_id, title } = msg.chat;
  const { id: user_id } = msg.from;
  const user = await User.findOne({ user_id });

  if (user && user.role === 'creator') {
    bot.sendMessage(group_id, ADMIN_REGISTERED);
  } else if (user && user.role !== 'creator') {
    bot.sendMessage(group_id, INVALID_INPUT);
  } else {
    const queryAdministrators = await bot.getChatAdministrators(group_id);
    const creator = queryAdministrators.find(
      (item) => item.status === 'creator'
    );
    const { first_name, last_name, username } = creator.user;

    const newAdmin = await User.create({
      name: `${first_name} ${last_name}`.trim(),
      user_id,
      username: `@${username}`,
      group_id,
      role: creator.status,
    });

    await Group.create({
      group_id,
      group_name: title,
      members: [newAdmin._id],
    });

    bot.sendMessage(group_id, ADMIN_REGISTRATION_SUCCESS);
  }
}

/**
 * Create new user in database
 * - when user added or join, they will greeted by this function
 * - then insert their data to database User and Group
 */
async function welcome(msg, bot) {
  const {
    id: user_id,
    first_name,
    last_name,
    username,
    is_bot,
  } = msg.new_chat_member;
  const { id: group_id, title } = msg.chat;

  // if new member is bot, do nothing.
  if (is_bot) {
    return false;
  }

  const user = await User.findOne({ user_id });

  if (user) {
    bot.sendMessage(group_id, WELCOME_BACK(user.name, title), {
      parse_mode: 'Markdown',
    });
  } else {
    const newUser = await User.create({
      name: `${first_name} ${last_name}`.trim(),
      user_id,
      username: `@${username}`,
      group_id,
    });

    await Group.updateOne({ group_id }, { $push: { members: newUser._id } });

    bot.sendMessage(group_id, WELCOME(first_name, last_name, title), {
      parse_mode: 'Markdown',
    });
  }
}

async function rename(msg, bot) {
  const { id: user_id } = msg.from;
  const { id: group_id, title } = msg.chat;
  const newName = msg.text.split('/rename')[1].trim();

  await User.updateOne({ user_id }, { name: newName });

  bot.sendMessage(group_id, WELCOME_BACK(newName, title), {
    parse_mode: 'Markdown',
  });
}

module.exports = { start, welcome, register, rename };
