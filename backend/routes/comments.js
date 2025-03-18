const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Add a comment to a post
router.post('/', authenticate, async (req, res) => {
  const { postId, content } = req.body;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Create a new comment
    const newComment = new Comment({
      content,
      post: postId,
      author: req.user.id,
    });

    await newComment.save();

    // Populate the comment with author details
    const populatedComment = await newComment.populate('author', 'username');

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: 'Error adding comment', error: err });
  }
});

// Get all comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });

    if (!comments) return res.status(404).json({ message: 'No comments found' });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err });
  }
});

// Delete a comment (only accessible to the comment's author)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    // Ensure that the user is the author of the comment
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await comment.remove();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting comment', error: err });
  }
});

module.exports = router;
