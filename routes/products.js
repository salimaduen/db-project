import express from 'express';

var router = express.Router();


/* GET products listing. */
router.get('/', function(req, res, next) {
  res.render('products');
});

router.get('/:id', function(req, res, next) {
    const productID = req.params.id;
    res.send(`Product ID ${productID}`);
});


export default router;