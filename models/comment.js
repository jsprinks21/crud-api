const mongoose = require('mongoose');
const db = require('../db');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {type: String, required: true},
  date: {type: Date, default: Date.now},
  upvotes: {type: Number, default: 0},
  downvotes: {type: Number, default: 0}
});

const Comment = module.exports = db.model('Comment', commentSchema);

module.exports.schema = commentSchema;

//Create
module.exports.createComment = function(comment, callback) {
  Comment.create(comment, callback);
};

//Read
module.exports.getComments = function(conditions, callback) {
  Comment.find(conditions, null, null, callback);
};

//Update
/*
module.exports.updateComments = function(conditions, doc, callback) {
  Comment.update(conditions, doc, null, callback);
};*/

module.exports.updateOneComment = function(conditions, update, callback) {
  Comment.findOneAndUpdate(conditions, update, null, callback);
};

//Delete
/*
module.exports.deleteComments = function(conditions, callback) {
  Comment.remove(conditions, callback);
};*/

module.exports.deleteOneComment = function(conditions, callback) {
  Comment.findOneAndRemove(conditions, null, callback);
};
