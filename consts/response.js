const {
  openBook,
  notReport,
  notReportOnce,
  notReportTwice,
  notReportMore,
  checkMark,
  smile,
} = require('../consts/emoji');

// GENERAL
const INVALID_INPUT = 'Input tidak valid';
const RENAME_USER = 'Nama berhasil dirubah';
const RENAME_GROUP = 'Nama group berhasil dirubah';
const BOT_ADDED =
  'Bot berhasil dimasukkan, silahkan registrasi admin dengan mengetikkan /register';
const WELCOME = (name, groupTitle) =>
  `Ahlan wa Sahlan *${name}* di grup odoj *${groupTitle}*`;
const ADMIN_REGISTRATION_SUCCESS = 'Registrasi administrator berhasil';
const ADMIN_REGISTERED = 'Kamu sudah terdaftar sebagai admin';
const START_MESSAGE = `o  ⁠⁠⁠بِسْـــــــــمِ اللهِ الرَّحْمَٰنِ الرَّحِيْمِ  o

mari memulai tilawah 1 juz perhari, semoga istiqomah ${smile}.
    
*Berikut cara laporan tilawah dan fitur bot lain:*
1. Untuk laporan satu juz bisa langsung mengetikkan juz yang sudah dibaca, misal *Juz 3 kholas* atau hanya *3* saja.
2. Untuk laporan lebih dari satu juz bisa mengetikkan nomor juz secara berurutan, misal *juz 3, 4 5 kholas* atau hanya angka juz saja seperti *29 30 1 2*. Pastikan ada jeda antara angka juz, baik spasi atau karakter lainya.`;
const RESTART =
  'Juz yang terakhir kamu baca sudah di reset. Kamu bisa mulai lapor kembali dari juz berapa saja';

// REPORT
const JUZ_REPORT = (userName, juzRead) =>
  `Barakallah ${userName} telah membaca juz *${juzRead}*. Semoga istiqomah dan selalu semangat.`;
const JUZ_REPORT_ERROR =
  'Sepertinya juz yang kamu baca tidak berurutan. Adakah yang terlewat?';
const JUZ_REPORT_NOT_CONTINUES = (lastJuz, currentJuz) =>
  `Sepertinya ada yang salah. Juz terakhir yang kamu baca adalah *${lastJuz}*, sedang laporanmu kali ini adalah, atau berawal dari juz *${currentJuz}*`;

// STATISTICS
const UNAUTHORIZED = 'Hanya admin yang dapat menggunakan fitur ini';
const TEMPLATE = (
  members,
  kholas,
  notKholas,
  total,
  date,
  group
) => `o  ⁠⁠⁠بِسْـــــــــمِ اللهِ الرَّحْمَٰنِ الرَّحِيْمِ  o

Berikut adalah list tilawah Group ${group}
Periode: ${date.solar}
Hijri: ${date.lunar}

${notReport} : Belum lapor
${notReportOnce} : Tidak lapor 1x
${notReportTwice} : Tidak lapor 2x
${notReportMore} : Tidak lapor 3x dst

${members}
${openBook} ${checkMark} Kholas : *${kholas}*
BELUM LAPOR = ${notKholas} (total ${total})

Tetap SEMANGAT dan ISTIQOMAH TILAWAH sebelum tidur (dan kholas sebelum batas waktu).
Semoga menambah berkah hidup kita dan keluarga. Aamiin ...

Lapor satuan, ketik : lapor juz x/ juz x/ x
Lapor banyak, ketik : lapor juz x, y, z (harus urut)
untuk update secara otomatis. List harian berubah otomatis pada jam 23:59.
`;
const TEMPLATE_WEEKLY = (
  members,
  date,
  group
) => `o  ⁠⁠⁠بِسْـــــــــمِ اللهِ الرَّحْمَٰنِ الرَّحِيْمِ  o

Berikut adalah list tilawah Group ${group}
Periode: ${date.solarFrom} - ${date.solarTo}
Hijri: ${date.lunarFrom} - ${date.lunarTo}

${members}

Tetap SEMANGAT dan ISTIQOMAH TILAWAH sebelum tidur (dan kholas sebelum batas waktu).
Semoga menambah berkah hidup kita dan keluarga. Aamiin ...
`;

module.exports = {
  INVALID_INPUT,
  WELCOME,
  BOT_ADDED,
  RENAME_USER,
  RENAME_GROUP,
  ADMIN_REGISTERED,
  ADMIN_REGISTRATION_SUCCESS,
  JUZ_REPORT,
  JUZ_REPORT_ERROR,
  JUZ_REPORT_NOT_CONTINUES,
  START_MESSAGE,
  RESTART,
  UNAUTHORIZED,
  TEMPLATE,
  TEMPLATE_WEEKLY,
};
