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
    res.json({ message: 'Success' }); // If the token is valid, return success message to the client 
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






