const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

const Post = require('./models/post');

const port = 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/*
CREATE post
Form:
  {
    "title": title,
    "text": text
  }
*/
app.post('/api/posts', (req, res) => {
  Post.createPost(req.body, (err, post) =>{
    if (err) throw err;
    res.json(post);
  });
});

/*
CREATE comment
Form:
  {
    "text": text
  }
*/
app.post('/api/comments', (req, res) => {
  let comment = req.body;
  let conditions = { "_id": comment.postID };
  Post.getPosts(conditions, (err, result) => {
    let postComments = result[0].comments;
    postComments.push(comment);
    Post.updateOnePost(conditions, {"comments": postComments}, (err, post) => {comments
      if (err) throw err;
      res.json(post);
    });
  });
});

/*
READ posts
*/
app.get('/api/posts', (req, res) => {
  Post.getPosts({}, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

/*
READ comments
*/
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

/*
UPDATE post
Form:
  [{
    "_id": postID
  },
  {
    "fieldToUpdate": update,
    ...
  }]
*/
app.put('/api/posts', (req, res) => {
  Post.updateOnePost(req.body[0], req.body[1], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

/*
UPDATE comment
Form:
  [{
    "_id": postID,
    "comments._id": commentID
  },
  {
    "postID": postID,
    "text": text,
    "downvotes": downvotes, //optional
    "upvotes": upvotes, //optional
    "date": date //optional
  }]
*/
app.put('/api/comments', (req, res) => {
  comment = req.body[1];
  update = {
    "$set": {
      "comments.$": comment
    }
  };
  Post.updateOnePost(req.body[0], update, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

/*
DELETE post
Form:
  {
    "_id": postID
  }
*/
app.delete('/api/posts', (req, res) => {
  Post.deleteOnePost(req.body, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

/*
DELETE comment
Form:
  {
    "_id": postID,
    "comments._id": commentID
  }
*/
app.delete('/api/comments', (req, res) => {
  update = {
    "$unset" :{
      "comments.$": 1
    }
  }
  Post.updateOnePost(req.body, update, (err, result) => {
    if (err) throw err;
    res.json(result);
  })
});

app.listen(port);
console.log('Server started on port '+port);
