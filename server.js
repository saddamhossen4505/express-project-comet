const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const adminRoute = require('./routes/adminRoute');


// Init Express.
const app = express();


// Init Environment Variables.
dotenv.config();
const PORT = process.env.PORT || 4000;


// Static Folder.
app.use(express.static('public'));



// Data-Manage.
app.use(express.json());
app.use(express.urlencoded({ extended : false }));


// Init EJS.
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/app");


// Connect Router.
app.use('/admin', adminRoute);


// Create Server.
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`.bgMagenta.black);
});