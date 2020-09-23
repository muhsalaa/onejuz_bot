const { isInRange, isSequential } = require('../helpers');

function handleJuzReport(msg, bot, juzMultiple) {
  const juzArray = juzMultiple.map(Number);

  // check if juz read are valid
  if (isInRange(juzArray)) {
    // check if juz read is sequential
    if (juzArray.length === 1 || isSequential(juzArray)) {
      bot.sendMessage(
        msg.chat.id,
        `Barakallah, kamu telah membaca juz *${juzArray
          .sort()
          .join(', ')}*. Semoga istiqomah dan selalu semangat.`,
        { parse_mode: 'Markdown' }
      );
    } else {
      bot.sendMessage(
        msg.chat.id,
        'Sepertinya juz yang kamu baca tidak berurutan. Adakah yang terlewat?'
      );
    }
  } else {
    bot.sendMessage(msg.chat.id, 'Input tidak valid');
  }
}

module.exports = { handleJuzReport };
