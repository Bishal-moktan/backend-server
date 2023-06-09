import { db } from '../db.js';
import { cloudinary } from '../utils/cloudinary.js';

export const getPosts = (req, res) => {
  const q = 'SELECT * FROM posts';
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    'SELECT `username`, `title`, `desc`, p.img, u.img AS userImg, `date` from users u JOIN posts p ON u.id = p.uid where p.id = ? ';
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(data[0]);
  });
};

export const detelePost = (req, res) => {
  const q = 'DELETE FROM posts where id = ?';
  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(200).json('Posts has been deleted successfully.');
  });
};

export const addPost = async (req, res) => {
  const { title, desc, img, date, uid } = req.body;
  try {
    if (img) {
      const uploadRes = await cloudinary.uploader.upload(img, {
        upload_preset: 'mgetenergy_blog',
      });
      const q =
        'INSERT INTO posts(`title`, `desc`, `img`, `date`,`uid`) VALUES (?)';
      const values = [title, desc, uploadRes.url, date, uid];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        res.status(200).json('Post has been created.');
      });
    } else {
      res.status(400).json('Image is required');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, desc, date } = req.body;
  try {
    const q = 'UPDATE posts SET `title`=?, `desc`=?, `date`=? where id=?';
    const values = [title, desc, date];
    db.query(q, [...values, postId], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json('Post has been updated.');
    });
  } catch (error) {
    res.status(500).json('Some error occurred');
  }
};
