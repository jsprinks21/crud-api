const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

const Post = require('./models/post');

const port = 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Create
app.post('/api/posts', (req, res) => {
  Post.createPost(req.body, (err, post) =>{
    if (err) throw err;
    res.json(post);
  });
});

app.post('/api/comments', (req, res) => {
  let comment = req.body;
  let conditions = { "_id": comment.postID };
  Post.getPosts(conditions, (err, result) => {
    let postComments = result[0].comments;
    postComments.push(comment);
    Post.updateOnePost(conditions, {"comments": postComments}, (err, post) => {
      if (err) throw err;
      res.json(post);
    });
  });
});

//Read
app.get('/api/posts', (req, res) => {
  Post.getPosts({}, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/comments', (req, res) => {
  Post.getPosts({}, (err, results) => {
    if (err) throw err;
    let comments = [];
    results.forEach((post) => {
      comments = comments.concat(post.comments);
    });
    res.json(comments);
  });
});

//Update
app.put('/api/posts', (req, res) => {
  //req.body[0] = conditions, req.body[1] = update
  Post.updateOnePost(req.body[0], req.body[1], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.put('/api/comments', (req, res) => {
  res.send('Comment Update');
});

//Delete
app.delete('/api/posts', (req, res) => {
  Post.deleteOnePost(req.body, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.delete('/api/comments', (req, res) => {
  res.send('Comment Delete');
});

app.listen(port);
console.log('Server started on port '+port);
