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

    console.log(allSliderData);

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


    // Find Index.
    const index = allSliderData.findIndex( data => data.id == id);

    // UpdataData.
    allSliderData[index] = {
        ...allSliderData[index],
        title : req.body.title,
        subtitle : req.body.subtitle,
    }

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
    res.render('admin/client/index');
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
};