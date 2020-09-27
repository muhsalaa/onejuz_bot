const { Schema, model } = require('mongoose');

const GroupSchema = new Schema(
  {
    group_id: {
      type: Number,
      required: true,
    },
    group_name: {
      type: String,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Group', GroupSchema);
