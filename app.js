const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

const Post = require('./models/post');
const Comment = require('./models/comment');

const port = 8080;

//Create
app.post('/api/posts', (req, res) => {
  res.send('Post Create');
});

app.post('/api/comments', (req, res) => {
  res.send('Comment Create');
});

//Read
app.get('/api/posts', (req, res) => {
  res.send('Post Read');
});

app.get('/api/comments', (req, res) => {
  res.send('Comment Read');
});

//Update
app.put('/api/posts', (req, res) => {
  res.send('Post Update');
});

app.put('/api/comments', (req, res) => {
  res.send('Comment Update');
});

//Delete
app.delete('/api/posts', (req, res) => {
  res.send('Post Delete');
});

app.delete('/api/comments', (req, res) => {
  res.send('Comment Delete');
});

app.listen(port);
console.log('Server started on port '+port);
