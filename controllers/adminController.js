const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { title } = require('process');



// Show Dashboard Controller.
const showDashBoard = (req, res) => {
    res.render('admin/index');
};




// ShowSliderData Controller.
const showSliderData = (req, res) => {

    const allSliderData = JSON.parse(readFileSync(path.join(__dirname, '../db/slider.json')));
    res.render('admin/slider/index', {
        allSliderData
    });
};



// Create SliderData Controller.
const createSliderData = (req, res) => {
    const allSliderData = JSON.parse(readFileSync(path.join(__dirname, '../db/slider.json')));
    const { title, subtitle, photo } = req.body;


    // Get id
    let last_id = 1;
    if(allSliderData.length > 0){
        last_id = allSliderData[allSliderData.length - 1].id + 1;
    };


    // Add NewData
    allSliderData.push({
        id : last_id,
        title : title,
        subtitle : subtitle,
        photo : req.file.filename,
    });

    // Now store NewData to JSON db.
    writeFileSync(path.join(__dirname, '../db/slider.json'), JSON.stringify(allSliderData));

    // Now Back to form.
    res.redirect('/admin/slider');

};



// SingleView Controller.
const showSingleData = (req, res) => {
    const allSliderData = JSON.parse(readFileSync(path.join(__dirname, '../db/slider.json')));
    const { id } = req.params;
    const singleData = allSliderData.find( data => data.id == id );


    res.render('admin/slider/single', {
        singleData : singleData,
        
    });

};



// EditData Controller.
const editSingleData = (req, res) => {

    // Get AllSliderData.
    const allSliderData = JSON.parse(readFileSync(path.join(__dirname, '../db/slider.json')));

    // Get id.
    const { id } = req.params;

    // Find id for singleData.
    const edit_data_id = allSliderData.find( data => data.id == id );

    res.render('admin/slider/edit', {
        slider : edit_data_id,
    });

};



// SingleData UpDate Controller.
const updateSingleData = (req, res) => {

    // Get AllSliderData.
    const allSliderData = JSON.parse(readFileSync(path.join(__dirname, '../db/slider.json')));

    // Get id.
    const { id } = req.params;


     // Get Slider IndexNumber.
     const index = allSliderData.findIndex( data => data.id == id );


     allSliderData[index] = {
         ...allSliderData[index],
         title : req.body.title,
         subtitle : req.body.subtitle,
     };


    // Now StoreData to Json db.
    writeFileSync(path.join(__dirname, '../db/slider.json'), JSON.stringify(allSliderData));

    res.redirect('/admin/slider');

};


// DeleteData Controller.
const deleteSingleData = (req, res) => {

    // Get AllSliderData.
    const allSliderData = JSON.parse(readFileSync(path.join(__dirname, '../db/slider.json')));

    // Get id.
    const { id } = req.params;

    // Filter Alldata without delete id.
    const newData = allSliderData.filter( data => data.id != id );

    // Now StoreData to Json db.
    writeFileSync(path.join(__dirname, '../db/slider.json'), JSON.stringify(newData));

    // Now Back to AllSlider Data-Table.
    res.redirect('/admin/slider');

};





// ShowClientData Controller.
const showClientData = (req, res) => {
    const clientPhotos = JSON.parse(readFileSync(path.join(__dirname, '../db/client.json')));

    res.render('admin/client/index', {
        clientPhotos
    });

};





// SingleClient Data View.
const singleClientData = (req, res) => {

    const clientPhotos = JSON.parse(readFileSync(path.join(__dirname, '../db/client.json')));
    const { id } = req.params;
    const singleClient = clientPhotos.find( data => data.id == id );
    res.render('admin/client/single', {
        singleClient
    })
};



// Store ClientData.
const storeClientData = (req, res) => {
    
    // Get allData
    const clientPhotos = JSON.parse(readFileSync(path.join(__dirname, '../db/client.json')));
    // Get id
    let last_id = 1;
    if(clientPhotos.length > 0){
        last_id = clientPhotos[clientPhotos.length - 1].id + 1;
    };

    // Add NewData
    clientPhotos.push({
        id : last_id,
        photo : req.file.filename,
    });

    console.log(clientPhotos);
    // Now Restore Data to db.
    writeFileSync(path.join(__dirname, '../db/client.json'), JSON.stringify(clientPhotos));
    // Now Back to dataTable.
    res.redirect('/admin/client');
};




// Delete ClientData Controller.
const deleteClientData = (req, res) => {
    // Get allData.
    const clientPhotos = JSON.parse(readFileSync(path.join(__dirname, '../db/client.json')));

    // Get id.
    const { id } = req.params;

    // Get All Data without deleteData.
    const newData = clientPhotos.filter( data => data.id != id );

    // Now Replace NewData to db.
    writeFileSync(path.join(__dirname, '../db/client.json'), JSON.stringify(newData));

    // Now Back to clientDataTable.
    res.redirect('/admin/client');
};




// ShowBlogData Controller.
const showBlogData = (req, res) => {

    // Get allData.
    const allBlogData = JSON.parse(readFileSync(path.join(__dirname, '../db/blog.json')));

    res.render('admin/blog/index', {
        allBlogData
    });
};



// CreateBlog Data Controller.
const createBlogData = (req, res) => {

    // Get allData.
    const allBlogData = JSON.parse(readFileSync(path.join(__dirname, '../db/blog.json')));
    const { id, title, desc, photo } = req.body;

    // Get id.
    let last_id = 1;
    if(allBlogData.length > 0){
        last_id = allBlogData[allBlogData.length - 1 ].id + 1;
    };

    // Add NewData.
    allBlogData.push({
        id : last_id,
        title : title,
        desc : desc,
        photo : req.file.filename,
    });


    // Now Get NewData.
    writeFileSync(path.join(__dirname, '../db/blog.json'), JSON.stringify(allBlogData));

    // Now Back to AllData-Table.
    res.redirect('/admin/blog');

};



// BlogSingleView.
const singleBlogView = (req, res) => {
    // Get allData.
    const allBlogData = JSON.parse(readFileSync(path.join(__dirname, '../db/blog.json')));

    // Get id.
    const { id } = req.params;

    // Get singleData.
    const singleData = allBlogData.find( data => data.id == id );

    res.render('admin/blog/single', {
        singleData,
    })

};




// Edit SingleBlog.
const editSingleBlog = (req, res) => {
    // Get allData.
    const allBlogData = JSON.parse(readFileSync(path.join(__dirname, '../db/blog.json')));

    // Get id 
    const { id } = req.params;

    // Get singleData.
    const singleData = allBlogData.find( data => data.id == id );

    res.render('admin/blog/edit', {
        blog : singleData,
    });
};





// UpDate SingleBlog Controller.
const updateSingleBlog = (req, res) => {
    // Get allData.
    const allBlogData = JSON.parse(readFileSync(path.join(__dirname, '../db/blog.json')));
    const { title, desc } = req.body;

    // Get id 
    const { id } = req.params;
    // Get index.
    const index = allBlogData.findIndex( data => data.id == id );


    allBlogData[index] = {
        ...allBlogData[index],
        title : title,
        desc : desc,
    };

    writeFileSync(path.join(__dirname, '../db/blog.json'), JSON.stringify(allBlogData));

    res.redirect('/admin/blog')
};





// Delete SingleBlogData Controller.
const deleteSingleBlogData = (req, res) => {

    // Get allData.
    const allBlogData = JSON.parse(readFileSync(path.join(__dirname, '../db/blog.json')));
    
    // Get id 
    const { id } = req.params;

    // Now Filter AllData without deleteData.
    const newData = allBlogData.filter( data => data.id != id );

    // Now RestoreData to db.
    writeFileSync(path.join(__dirname, '../db/blog.json'), JSON.stringify(newData));

    // Back to blogPage.
    res.redirect('/admin/blog');

};







// ShowProductData Controller.
const showProductData = (req, res) => {

    const allProduct = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));
    res.render('admin/product/index', {
        allProduct,
    });
};




// Create ProductData Controller.
const createProductData = (req, res) => {
    // Get allData.
    const allProduct = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Get formData.
    const { id, title, price } = req.body;

    // Get id.
    let last_id = 1;
    if(allProduct.length > 0){
        last_id = allProduct[allProduct.length - 1].id + 1;
    };


    // Add NewData.
    allProduct.push({
        id : last_id,
        title : title,
        price : price,
        photo : req.file.filename,
    });


    // Now StoreNewData to db.
    writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(allProduct));

    // Now Back to DataTable.
    res.redirect('/admin/product');
};




// SingleProductData Controller.
const singleProductData = (req, res) => {
    // Get allData.
    const allProduct = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Get id.
    const { id } = req.params;

    // FindIdData.
    const singleProductId = allProduct.find( data => data.id == id );

    res.render('admin/product/single', {
        product : singleProductId,
    });
};




// EditSingleProductData Controller.
const editSingleProductData = (req, res) => {

    // Get allData.
    const allProduct = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Get id.
    const { id } = req.params;

    // FindIdData.
    const singleProductId = allProduct.find( data => data.id == id );

    res.render('admin/product/edit', {
        product : singleProductId,
    });
};




// Update SingleProductData Controller.
const updateSingleProductData = (req, res) => {

    // Get allData.
    const allProduct = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Get id.
    const { id } = req.params;

    // FindIndex of Data db.
    const index = allProduct.findIndex( data => data.id == id );

    // Add UpdateData.
    allProduct[index] = {
        ...allProduct[index],
        title : req.body.title,
        price : req.body.price
    };

    // Now Store Data to db.
    writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(allProduct));

    // Now Back to ProductData-Table.
    res.redirect('/admin/product');
};




// DeleteSingleProductData Controller.
const deleteSingleProductData = (req, res) => {

    // Get allData.
    const allProduct = JSON.parse(readFileSync(path.join(__dirname, '../db/product.json')));

    // Get id.
    const { id } = req.params;

    // Get DataWithout deleteData.
    const newData = allProduct.filter( data => data.id != id );

    // Now Restore NewData to db.
    writeFileSync(path.join(__dirname, '../db/product.json'), JSON.stringify(newData));

    // Now Back to Product Data-Table.
    res.redirect('/admin/product');
};





// Exports Controllers.
module.exports = {
    showDashBoard,
    showSliderData,
    showClientData,
    createSliderData,
    showSingleData,
    editSingleData,
    updateSingleData,
    deleteSingleData,
    singleClientData,
    storeClientData,
    deleteClientData,
    showBlogData,
    createBlogData,
    singleBlogView,
    editSingleBlog,
    updateSingleBlog,
    deleteSingleBlogData,
    showProductData,
    createProductData,
    singleProductData,
    editSingleProductData,
    updateSingleProductData,
    deleteSingleProductData
};