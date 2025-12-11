import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // ensures tag names are unique
      trim: true,
    },
  },
  {
    timestamps: false, // same as Sequelize config
  }
);

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
