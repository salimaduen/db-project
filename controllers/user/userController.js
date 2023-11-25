import db from '../../database/database.js';

const dashboard = async (req, res) => {
  console.log(req.session.userID);
  if (!req.session.userID) {
    return res.redirect('/login');
  }
  const query = 'SELECT * FROM User WHERE UserID = ?';
  const conn = await db.getConnection();

  try {
    const results = await conn.query(query, [req.session.userID]);
    if (results.length > 0) {
      const user = results[0];
      res.render('dashboard', { user});
    } else {
      res.redirect('login');
    }
  } catch (error) { 
    console.error(error);
  } finally { 
    if (conn) await conn.release()
  }


};


export default {
  dashboard
};