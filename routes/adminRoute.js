
const express = require('express');
const path = require('path');
const multer = require('multer');
const { showDashBoard, showSliderData, showClientData, createSliderData, showSingleData, editSingleData, updateSingleData, deleteSingleData, singleClientData, storeClientData, deleteClientData, showBlogData, createBlogData, singleBlogView, editSingleBlog, updateSingleBlog, deleteSingleBlogData, showProductData, createProductData, singleProductData, editSingleProductData, updateSingleProductData, deleteSingleProductData } = require('../controllers/adminController');




// Init Multer for Slider.
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/sliderImg'));
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const sliderPhotoMulter = multer({
    storage : storage
}).single('slider_img_upload');




// Init Multer for Client.
const storage1 = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/clientPhoto'));
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const clientPhotoMulter = multer({
    storage : storage1
}).single('client_img_upload');




// Init Multer for Blog.
const storage2 = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/blogPhoto'));
    },
    filename : (req, file, cb) => {
        cb( null, file.originalname);
    }
});

const blogPhotoMulter = multer({
    storage : storage2
}).single('blog_img_upload');




// Init Multer for Product.
const storage3 = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/productPhoto'));
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const productPhotoMulter = multer({
    storage : storage3,
}).single('product_img_upload');




// Init Router.
const router = express.Router();



// Routes.
router.get('/', showDashBoard);
router.get('/slider', showSliderData);
router.post('/slider', sliderPhotoMulter, createSliderData);
router.get('/slider/:id', showSingleData);
router.get('/slider/edit/:id', editSingleData);
router.post('/slider/update/:id', sliderPhotoMulter, updateSingleData);
router.get('/slider/delete/:id', deleteSingleData);


router.get('/client', showClientData);
router.post('/client', clientPhotoMulter, storeClientData);
router.get('/client/:id', singleClientData);
router.get('/client/delete/:id', deleteClientData);



router.get('/blog', showBlogData);
router.post('/blog', blogPhotoMulter, createBlogData);
router.get('/blog/:id', singleBlogView);
router.get('/blog/edit/:id', editSingleBlog);
router.post('/blog/update/:id', blogPhotoMulter, updateSingleBlog);
router.get('/blog/delete/:id', deleteSingleBlogData);



router.get('/product', showProductData);
router.post('/product', productPhotoMulter, createProductData);
router.get('/product/:id', singleProductData);
router.get('/product/edit/:id', editSingleProductData);
router.post('/product/update/:id', productPhotoMulter, updateSingleProductData);
router.get('/product/delete/:id', deleteSingleProductData);



// Exports Routers.
module.exports = router;