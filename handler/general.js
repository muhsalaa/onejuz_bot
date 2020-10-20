const User = require('../models/user');
const Group = require('../models/group');
const Record = require('../models/record');

const {
  INVALID_INPUT,
  WELCOME,
  BOT_ADDED,
  ADMIN_REGISTRATION_SUCCESS,
  ADMIN_REGISTERED,
  USER_REGISTERED,
  START_MESSAGE,
  RESTART,
  RENAME_GROUP,
  RENAME_USER,
} = require('../consts/response');
const { getName } = require('../helpers');

/**
 * Welcome user to bot and show guide
 * - guide not ready yet lol
 */
function start(msg) {
  return { target: msg.chat.id, message: START_MESSAGE };
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
  const group = await Group.findOne({ group_id });

  if (!group) {
    await Group.create({
      group_id,
      group_name: title,
    });
  }

  if (user && user.role === 'creator') {
    return { target: group_id, message: ADMIN_REGISTERED };
  } else if (user && user.role !== 'creator') {
    return { target: group_id, message: USER_REGISTERED };
  } else {
    const userData = await bot.getChatMember(group_id, user_id);
    const { first_name, last_name, username } = userData.user;
    const name = getName({ first_name, last_name });

    const record = await Record.create({
      group_id,
    });
    const newUser = await User.create({
      name,
      user_id,
      username: `@${username}`,
      group_id,
      role: userData.status,
      record: record._id,
    });

    await Group.findOneAndUpdate(
      { group_id },
      {
        $push: { members: newUser._id },
      }
    );

    return {
      target: group_id,
      message:
        userData.status === 'creator' || userData.status === 'admin'
          ? ADMIN_REGISTRATION_SUCCESS
          : WELCOME(name, title),
    };
  }
}

/**
 * Create new user in database
 * - when user added or join, they will greeted by this function
 * - then insert their data to database User and Group
 */
async function welcome(msg) {
  const {
    id: user_id,
    first_name,
    last_name,
    username,
    is_bot,
  } = msg.new_chat_member;
  const { id: group_id, title } = msg.chat;

  // if new member is bot, send special message
  if (is_bot && user_id === process.env.BOT_ID) {
    return {
      target: group_id,
      message: BOT_ADDED,
    };
  }

  const name = getName({ first_name, last_name });

  const record = await Record.create({
    group_id,
  });
  const newUser = await User.create({
    name,
    user_id,
    username: `@${username}`,
    group_id,
    record: record._id,
  });

  await Group.updateOne({ group_id }, { $addToSet: { members: newUser._id } });

  return { target: group_id, message: WELCOME(name, title) };
}

/**
 * Rename user
 */
async function rename(msg) {
  const { id: user_id } = msg.from;
  const { id: group_id, title } = msg.chat;
  const newName = msg.text.split('/rename')[1].trim();

  await User.updateOne({ user_id }, { name: newName });

  return { target: group_id, message: RENAME_USER };
}

/**
 * Rename group
 */
async function renameGroup(msg) {
  const { id: user_id } = msg.from;
  const { id: group_id } = msg.chat;
  const newName = msg.text.split('/renameg')[1].trim();
  const user = await User.findOne({ user_id });

  console.log(user);

  if (user && user.role === 'creator') {
    await Group.updateOne({ group_id }, { group_name: newName });

    return { target: group_id, message: RENAME_GROUP };
  }

  return { target: group_id, message: INVALID_INPUT };
}

/**
 * Handler to restart user read state
 * @param {Object} msg - Telegram message object
 */
async function restart(msg) {
  const { id: user_id } = msg.from;
  const { id: group_id } = msg.chat;

  const user = await User.findOneAndUpdate(
    { user_id },
    {
      last_juz_report: new Date().toISOString(),
      last_juz_read: 0,
    }
  );

  await Record.findByIdAndUpdate(user.record, {
    ...Object.assign({}, [1, 2, 3, 4, 5, 6, 7]),
  });

  return { target: group_id, message: RESTART };
}

/**
 * Remove user from database when leaving group
 */
async function remove(msg) {
  const { id: user_id, is_bot } = msg.left_chat_member;
  const { id: group_id } = msg.chat;

  // if odoj bot deleted, delete group and all of its member data
  if (is_bot && user_id == process.env.BOT_ID) {
    await Group.findOneAndDelete({ group_id });
    await User.deleteMany({ group_id });
    await Record.deleteMany({ group_id });
  }

  // delete member in database and pull its id from group data
  else {
    const user = await User.findOneAndDelete({ user_id });
    await Group.updateOne({ group_id }, { $pull: { members: user._id } });
  }
}

module.exports = {
  start,
  welcome,
  register,
  rename,
  restart,
  remove,
  renameGroup,
};
