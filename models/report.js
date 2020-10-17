const { Schema, model } = require('mongoose');

const ReportSchema = new Schema({
  // sunday
  0: {
    type: Number,
    default: 1,
  },
  1: {
    type: Number,
    default: 2,
  },
  2: {
    type: Number,
    default: 3,
  },
  3: {
    type: Number,
    default: 4,
  },
  4: {
    type: Number,
    default: 5,
  },
  5: {
    type: Number,
    default: 6,
  },
  // saturday
  6: {
    type: Number,
    default: 7,
  },
  group_id: {
    type: Number,
  },
});

module.exports = model('Report', ReportSchema);
