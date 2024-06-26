const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // Add this to parse cookies in the request headers 
const filesRouter = require('./routes/upload.route.js');
const path = require('path'); // Add this to resolve paths in Node.js
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
    //https://final-project-di-24.onrender.com

app.use(cors({
    origin: 'https://final-project-di-24.onrender.com',
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

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "../client/dist")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});



//uploading images to s3 bucket and storing the url in the database(images) table and also the description of the image and the time it was uploaded.

