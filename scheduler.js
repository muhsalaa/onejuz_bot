const cron = require('node-cron');

const Group = require('./models/group');

const { botSend } = require('./helpers');
const {
  dailyStatisticGenerator,
  weeklyStatisticGenerator,
} = require('./handler/statistics');

const reportDaily = (bot) =>
  cron.schedule(
    '59 23 * * *',
    async () => {
      let groups = await Group.find({});

      for (const group of groups) {
        const response = await dailyStatisticGenerator('', group.group_id);
        botSend(bot, response);
      }
    },
    {
      timezone: 'Asia/Jakarta',
    }
  );

const reportWeekly = (bot) =>
  cron.schedule(
    '59 23 * * 6',
    async () => {
      const groups = await Group.find({}).populate({
        path: 'members',
        populate: {
          path: 'report',
          model: 'Report',
          select: { _id: 0, __v: 0, group_id: 0 },
        },
      });

      for (const group of groups) {
        const response = await weeklyStatisticGenerator(group);
        botSend(bot, response);
      }
    },
    {
      timezone: 'Asia/Jakarta',
    }
  );

module.exports = { reportDaily, reportWeekly };
