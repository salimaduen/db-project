import express from 'express';
import user from '../database/models/user/user.js';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index');
});


export default router;
