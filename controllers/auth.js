import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// register controller
export const register = (req, res) => {
  const q = 'SELECT * FROM users where `email` = ? OR `username` = ?';
  db.query(q, [req.body.email, req.body.username], async (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const q = 'INSERT INTO users (`username`, `email`, `password`) VALUES (?)';
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created...');
    });
  });
};

// login controller
export const login = (req, res) => {
  // Check users exists of not
  const q = 'SELECT * from users where username = ?';
  db.query(q, [req.body.username], async (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json('User not found');
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      data[0].password
    );

    if (!isValidPassword)
      return res.status(400).json('Invalid username or password');

    const token = jwt.sign({ id: data[0].id }, 'mgetenergyKey');
    const { password, ...others } = data[0];
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

// logout controller
export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been successfully logged out');
};
