// GENERAL
const INVALID_INPUT = 'Input tidak valid';
const WELCOME_BACK = (userName, groupTitle) =>
  `Ahlan wa Sahlan, selamat datang kembali *${userName}* di grup odoj *${groupTitle}*`;
const WELCOME = (firstName, lastName, groupTitle) =>
  `Ahlan wa Sahlan *${firstName} ${lastName}* di grup odoj *${groupTitle}*`;
const ADMIN_REGISTRATION_SUCCESS = 'Registrasi administrator berhasil';
const ADMIN_REGISTERED = 'Kamu sudah terdaftar sebagai admin';

// REPORT
const JUZ_REPORT = (userName, juzRead) =>
  `Barakallah ${userName} telah membaca juz *${juzRead}*. Semoga istiqomah dan selalu semangat.`;
const JUZ_REPORT_ERROR =
  'Sepertinya juz yang kamu baca tidak berurutan. Adakah yang terlewat?';
const JUZ_REPORT_NOT_CONTINUES = (lastJuz, currentJuz) =>
  `Sepertinya ada yang salah. Juz terakhir yang kamu baca adalah *${lastJuz}*, sedang laporanmu kali ini adalah, atau berawal dari juz *${currentJuz}*`;

module.exports = {
  INVALID_INPUT,
  WELCOME,
  WELCOME_BACK,
  ADMIN_REGISTERED,
  ADMIN_REGISTRATION_SUCCESS,
  JUZ_REPORT,
  JUZ_REPORT_ERROR,
  JUZ_REPORT_NOT_CONTINUES,
};
