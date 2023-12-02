const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.login = (req, res) => {
  res.render('login');
};

exports.loginPost = async (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM User WHERE Username = ?';
  let conn;

  try {
    conn = await db.getConnection();
    const rows = await conn.query(query, [username]);

    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await bcrypt.compare(password + user.Salt, user.PasswordHash);
      
      if (validPassword) {
        req.session.userID = user.UserID.toString();
        return res.redirect('/dashboard');
      }
    }
    res.render('login', { error: 'Invalid username or password' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) await conn.release();
  }
};

exports.register = (req, res) => {
  res.render('register');
};

exports.registerPost = async (req, res) => {
  const { username, email, firstname, lastname, address, phone, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password + salt, 10);
  let conn;

  try {
    conn = await db.getConnection();
    const userResult = await conn.query('INSERT INTO User (Username, Email, FirstName, LastName, Address, Phone, PasswordHash, Salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [username, email, firstname, lastname, address, phone, passwordHash, salt]);
    const userID = userResult.insertId;
    req.session.userID = userID.toString();
    res.redirect('/dashboard');
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.render('register', { error: 'Username already exists' });
    }
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) await conn.release();
  }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/login');
      }
    });
};
