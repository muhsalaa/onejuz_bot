const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    username: {
      type: String,
      required: [true, 'Please add a name'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    last_juz_read: {
      type: Number,
    },
    juz_read_monthly: {
      type: Number,
    },
    last_juz_report: {
      type: String,
    },
    khatam: {
      type: Number,
    },
    group_id: {
      type: Number,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
