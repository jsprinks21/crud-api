const mongoose = require('mongoose');
const db = require('../db');
const Post = require('./post');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postID: {type: String, required: true},
  text: {type: String, required: true},
  date: {type: Date, default: Date.now},
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0}
});

const Comment = module.exports; // = db.model('Comment', commentSchema);

module.exports.schema = commentSchema;
