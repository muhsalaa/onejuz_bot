require('dotenv').config();
const TeleBot = require('node-telegram-bot-api');

const connectDB = require('./db');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TeleBot(token, { polling: true });

const { oneJuzBot, newUser, remove } = require('./handler');
const { reportDaily, reportWeekly } = require('./scheduler');

connectDB();

bot.on('text', (msg) => {
  oneJuzBot(msg, bot);
});

bot.on('new_chat_members', async (msg) => {
  newUser(msg, bot);
});

bot.on('left_chat_member', (msg) => {
  remove(msg, bot);
});

reportDaily(bot);
reportWeekly(bot);
