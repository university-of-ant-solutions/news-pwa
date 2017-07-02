import mongoose from 'mongoose';
import timestamp from 'mongoose-timestamp';

const { Schema } = mongoose;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  pubDate: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  guid: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  description: Schema.Types.Mixed,
  content: Schema.Types.Mixed,
  enclosure: {
    type: Array,
  },
  categories: {
    type: Array,
  },
});

// https://github.com/drudge/mongoose-timestamp
NewsSchema.plugin(timestamp);

export default NewsSchema;
