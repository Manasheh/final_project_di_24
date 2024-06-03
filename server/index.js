const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const filesRouter = require('./routes/upload.route.js');
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json()); // Add this to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Add this to parse URL encoded bodies
app.use(cookieParser())

// Routes
app.use('/', filesRouter);

app.listen(PORT, () => {
    console.log('Up and running on port', PORT);
});



//uploading images to s3 bucket and storing the url in the database(images) table and also the description of the image and the time it was uploaded.

//date 30/08/2021, i will fetch the images, desc, time from the database and display them on the frontend



// motzei shabbath 

// there was an error when loggin, it navigate to the dashboard but there was error 











// const express = require('express');
// const cors = require('cors')
// const dotenv = require('dotenv');
// const files_router = require('./routes/upload.route.js')
// dotenv.config();

// const PORT = process.env.PORT || 8080;
// const app = express();

// //middleware
// app.use(cors());

// app.use('/', files_router)

// app.listen(PORT, () => {
//     console.log('Up and running at', PORT);
// })