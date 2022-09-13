const express = require('express');
const { showHomePage, showSingleBlog, showProductPage, showSingleProductPage } = require('../controllers/cometController');



// Init Router.
const router = express.Router();




// Routes.
router.get('/', showHomePage);
router.get('/product', showProductPage);
router.get('/product/:id', showSingleProductPage);
router.get('/:id', showSingleBlog);





// Exports Router.
module.exports = router;