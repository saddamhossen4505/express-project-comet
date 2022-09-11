
const express = require('express');
const path = require('path');
const multer = require('multer');
const { showDashBoard, showSliderData, showClientData, createSliderData, showSingleData, editSingleData, updateSingleData, deleteSingleData } = require('../controllers/adminController');




// Init Multer.
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



// Exports Routers.
module.exports = router;