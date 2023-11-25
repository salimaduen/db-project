import bcrypt from 'bcrypt';
import db from '../../database/database.js';

const login = (req, res) => {
  res.render('login');
};

const loginPost = async (req, res) => {
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

const register = (req, res) => {
  res.render('register');
};

const registerPost = async (req, res) => {
  const { username, email, firstname, lastname, address, phone, password, paymentmethod, cardnumber, expirydate } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password + salt, 10);
  let conn;

  try {
    conn = await db.getConnection();
    const userResult = await conn.query('INSERT INTO User (Username, Email, FirstName, LastName, Address, Phone, PasswordHash, Salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [username, email, firstname, lastname, address, phone, passwordHash, salt]);
    const userID = userResult.insertId;
    await conn.query('INSERT INTO Payment (UserID, PaymentMethod, CardNumber, ExpiryDate) VALUES (?, ?, ?, ?)', [userID, paymentmethod, cardnumber, expirydate]);
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

const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/login');
      }
    });
};


export default {
  login,
  loginPost,
  register,
  registerPost,
  logout
};