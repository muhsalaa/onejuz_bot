require('dotenv').config();
const TeleBot = require('node-telegram-bot-api');

const connectDB = require('./db');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TeleBot(token, { polling: true });

const { oneJuzBot, newUser, remove } = require('./handler');
const { reportDaily, reportWeekly } = require('./scheduler');

connectDB();

bot.on('text', (msg) => {
  if (msg.chat.type === 'group') {
    oneJuzBot(msg, bot);
  } else {
    bot.sendMessage(msg.chat.id, 'Bot hanya bisa digunakan dalam grup');
  }
});

bot.on('new_chat_members', async (msg) => {
  newUser(msg, bot);
});

bot.on('left_chat_member', (msg) => {
  remove(msg, bot);
});

reportDaily(bot);
reportWeekly(bot);

var express = require('express');
var app = express();

app.set('port', process.env.PORT || 5000);

//For avoidong Heroku $PORT error
app
  .get('/', function (request, response) {
    var result = 'App is running';
    response.send(result);
  })
  .listen(app.get('port'), function () {
    console.log(
      'App is running, server is listening on port ',
      app.get('port')
    );
  });
