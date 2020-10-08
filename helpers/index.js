const { isInRange, isSequential, lastJuzReadContinue } = require('./report');
const { botSend } = require('./sender');
const { idDateFormat } = require('./date');
const { getName } = require('./general');

module.exports = {
  isInRange,
  isSequential,
  lastJuzReadContinue,
  botSend,
  idDateFormat,
  getName,
};
