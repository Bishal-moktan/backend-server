import express from 'express';
import {
  addPost,
  detelePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', detelePost);
router.put('/:id', updatePost);

export default router;
