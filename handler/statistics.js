const moment = require('moment-hijri');

const User = require('../models/user');
const Group = require('../models/group');

const { UNAUTHORIZED, TEMPLATE } = require('../consts/response');
const { getDaysGap, idDateFormat } = require('../helpers/date');
const { memberReportGenerator } = require('../helpers/report');

/**
 * Daily read report
 * @param {*} msg  - msg data
 * - status of user
 * - current read if already reported
 */
async function dailyStatisticGenerator(msg, groupIdCron) {
  let group_id = groupIdCron;

  // if report is from admin, run this block of code
  if (!group_id) {
    const { id } = msg.chat;
    const { id: user_id } = msg.from;
    const user = await User.findOne({ user_id });

    if (!['creator', 'admin'].includes(user.role)) {
      return { target: id, message: UNAUTHORIZED };
    } else {
      group_id = id;
    }
  }

  const group = await Group.findOne({ group_id }).populate('members');

  let kholas = 0;
  let notKholas = 0;
  let memberStat = '';
  const total = group.members.length;
  const date = {
    solar: idDateFormat(new Date()),
    lunar: moment().format('iD iMMM iYYYY'),
  };

  // generate report
  group.members.forEach((member) => {
    const gap = getDaysGap(member.last_juz_report);
    memberStat += memberReportGenerator(member, gap);
    if (gap < 1) {
      kholas += 1;
    } else {
      notKholas += 1;
    }
  });

  return {
    target: group_id,
    message: TEMPLATE(
      memberStat,
      kholas,
      notKholas,
      total,
      date,
      group.group_name
    ),
  };
}

module.exports = { dailyStatisticGenerator };
