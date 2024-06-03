const express = require('express');
const router = express.Router();
const { uploadFile, getUserImages, deleteImage, register, login, getSingleImage, updateDescription } = require('../controller/upload.controller.js');
const verifyToken = require('../middlewares/verifyToken.js');
const upload = require('../middlewares/upload.js');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Verify Token (Protected Route)
router.get('/verify', verifyToken, (req, res) => {
    res.json({ message: 'Success' });
});

// Upload image to S3 and store the URL in the database
router.post('/upload-single', [verifyToken,upload.single('file')], uploadFile);

// Get all images from the database for the logged-in user
router.get('/getUserImage', verifyToken, getUserImages);

router.get('/getSingleImage/:id', verifyToken, getSingleImage);


//update description
router.put('/updateDescription/:id', verifyToken, updateDescription);

// Delete image from the database and S3 bucket
router.delete('/deleteImage/:id', verifyToken, deleteImage);

module.exports = router;






//on date 2/6/2024 time: 1:11 pm 

// const express = require('express');
// const router = express.Router();
// const { uploadFile, getUserImages, deleteImage, register, login } = require('../controller/upload.controller.js');
// const verifyToken = require('../middlewares/verifyToken.js');
// const upload = require('../middlewares/upload.js');

// // Upload image to s3 and store the URL in the database
// router.post('/upload-single', upload.single('file'), uploadFile);

// //get all users
// // router.get('/all', verifyToken, all)

// // Get all images from the database
// router.get('/getUserImage', verifyToken, getUserImages);

// // Delete image from the database and s3 bucket
// router.delete('/deleteImage/:id', verifyToken, deleteImage);

// // Register
// router.post('/register', register);

// // Login
// router.post('/login', login);

// // Verify Token (Protected Route)
// router.get('/verify', verifyToken, (req, res) => {
//     res.json({ message: 'Success' });
//     console.log('verify token from route verify');
// });

// module.exports = router;







// const express = require('express');
// const router = express.Router();
// const { uploadFile, getUserImages, deleteImage, register, login } = require('../controller/upload.controller.js');
// const verifyToken = require('../middlewares/verifyToken.js');
// const upload = require('../middlewares/upload.js');

// // Upload image to s3 and store the URL in the database
// router.post('/upload-single', upload.single('file'), uploadFile);

// // Get all images from the database
// router.get('/getUserImage', getUserImages);

// // Delete image from the database and s3 bucket
// router.delete('/deleteImage/:id', deleteImage);

// // Register
// router.post('/register', register);

// // Login
// router.post('/login', login);

// // Getting the verify token from middlewares/verifyToken.js
// // This is the route to verify the token and it is protected by the verifyToken middleware which is in the middlewares/verifyToken.js file 
// router.get('/verify', verifyToken, (req, res) => {
//     // Can add more logic here
//     res.json({ message: 'Success' });
// });

// module.exports = router;
