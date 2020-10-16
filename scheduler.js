const cron = require('node-cron');

const Group = require('./models/group');

const { botSend } = require('./helpers');
const { dailyStatisticGenerator } = require('./handler/statistics');

const reportDaily = (bot) =>
  cron.schedule(
    '59 23 * * *',
    async () => {
      let group = await Group.find({});

      group.forEach(async (element) => {
        const response = await dailyStatisticGenerator('', element.group_id);
        botSend(bot, response);
      });
    },
    {
      timezone: 'Asia/Jakarta',
    }
  );

module.exports = { reportDaily };
