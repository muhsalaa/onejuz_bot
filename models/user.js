const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
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
      required: [true, 'Please add a username'],
    },
    role: {
      type: String,
      enum: ['creator', 'member', 'admin'],
      default: 'member',
    },
    last_juz_read: {
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

module.exports = model('User', UserSchema);
