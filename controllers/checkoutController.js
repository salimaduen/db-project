import db from '../database/database.js';
import Cart from '../models/cart/cart.js'


const checkoutPage = (req, res) => {
  res.render('checkout');
};

const processCheckout = async (req, res) => {
  const { paymentMethod, cardNumber, expiryDate } = req.body;
  let conn;

  try {
    conn = await db.getConnection();

    const totalPrice = await Cart.getTotalPrice(req.session.userID);

    await conn.query('INSERT INTO Payment (UserID, PaymentMethod, CardNumber, ExpiryDate) VALUES (?, ?, ?, ?)', [req.session.userID, paymentMethod, cardNumber, expiryDate]);

    const orderDate = new Date().toISOString().slice(0, 10); // Format current date to YYYY-MM-DD
    const orderStatus = 'Order Placed';
    await conn.query('INSERT INTO Orders (UserID, OrderDate, Status, TotalPrice) VALUES (?, ?, ?, ?)', [req.session.userID, orderDate, orderStatus, totalPrice]);


    res.redirect('/order-success');
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (conn) conn.release();
  }
};

export default {
  checkoutPage,
  processCheckout
};
