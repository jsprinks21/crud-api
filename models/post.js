const mongoose = require('mongoose')
const db = require('../db');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const postSchema = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  date: {type: Date, default: Date.now},
  comments: [Comment.schema]
});

const Post = module.exports = db.model('Post', postSchema);

//Create
module.exports.createPost = function(post, callback) {
  Post.create(post, callback);
};

//Read
module.exports.getPosts = function(conditions, callback) {
  Post.find(conditions, null, null, callback);
};

//Update
module.exports.updatePosts = function(conditions, doc, callback) {
  Post.update(conditions, doc, null, callback);
};

module.exports.updateOnePost = function(conditions, update, callback) {
  Post.findOneAndUpdate(conditions, update, null, callback);
};

//Delete
module.exports.deletePosts = function(conditions, callback) {
  Post.remove(conditions, callback);
};

module.exports.deleteOnePost = function(conditions, callback) {
  Post.findOneAndRemove(conditions, null, callback);
};
