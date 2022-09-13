const { readFileSync } = require('fs');
const path = require('path');


// Show HomePage Controller.
const showHomePage = (req, res) => {

    const allSlider = JSON.parse(readFileSync(path.join(__dirname, '../db/slider.json')));
    const allClients = JSON.parse(readFileSync(path.join(__dirname, '../db/client.json')));
    const allBlogs = JSON.parse(readFileSync(path.join(__dirname, '../db/blog.json')));
    
    res.render('comet/index-2', {
        allSlider,
        allClients,
        allBlogs,
    });
};





// ShowSingleBlog Page Controller.
const showSingleBlog = (req, res) => {

    const allBlogs = JSON.parse(readFileSync(path.join(__dirname, '../db/blog.json')));
    const { id } = req.params;
    const newData = allBlogs.find(data => data.id == id );

    res.render('comet/singleblog', {
         newData,
    });
};





// ShowProductPage Controller.
const showProductPage = (req, res) => {

    const allProduct = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    res.render('comet/shop-3col', {
        allProduct,
    });
};





// SingleProductPage Controller.
const showSingleProductPage = (req, res) => {

    // GetAllData.
    const allProduct = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Get Id.
    const { id } = req.params;

    // Find Data.
    const newProduct = allProduct.find( data => data.id == id ); 

    res.render('comet/shop-single', {
        newProduct,
    });
};





// Exports Controller.
module.exports = {
    showHomePage,
    showSingleBlog,
    showProductPage,
    showSingleProductPage,
};