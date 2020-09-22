require('dotenv').config();
const TeleBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TeleBot(token, { polling: true });

const { oneJuzBot } = require('./handler');

bot.on('text', (msg) => {
  oneJuzBot(msg, bot);
});
