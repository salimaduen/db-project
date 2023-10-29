const db = require('../config/db');

exports.dashboard = (req, res) => {
  if (!req.session.userID) {
    return res.redirect('/login');
  }
  const query = 'SELECT * FROM User WHERE UserID = ?';
  db.query(query, [req.session.userID], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const user = results[0];
      res.render('dashboard', { user });
    } else {
      res.redirect('/login');
    }
  });
};
