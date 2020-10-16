const User = require('../models/user');
const Group = require('../models/group');

const {
  INVALID_INPUT,
  WELCOME,
  ADMIN_REGISTRATION_SUCCESS,
  ADMIN_REGISTERED,
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

  if (user && user.role === 'creator') {
    return { target: group_id, message: ADMIN_REGISTERED };
  } else if (user && user.role !== 'creator') {
    return { target: group_id, message: INVALID_INPUT };
  } else {
    const queryAdministrators = await bot.getChatAdministrators(group_id);
    const creator = queryAdministrators.find(
      (item) => item.status === 'creator'
    );
    const { first_name, last_name, username } = creator.user;
    const name = getName({ first_name, last_name });
    const newAdmin = await User.create({
      name,
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

    return { target: group_id, message: ADMIN_REGISTRATION_SUCCESS };
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

  // if new member is bot, do nothing.
  if (is_bot) {
    return false;
  }

  const name = getName({ first_name, last_name });
  const newUser = await User.create({
    name,
    user_id,
    username: `@${username}`,
    group_id,
    last_juz_report: new Date().toISOString(),
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

async function restart(msg) {
  const { id: user_id } = msg.from;
  const { id: group_id } = msg.chat;

  await User.updateOne(
    { user_id },
    {
      last_juz_read: null,
      last_juz_report: new Date().toISOString(),
    }
  );

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
