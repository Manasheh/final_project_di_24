const { _uploadSingle, _getUserImages, _deleteImage, _register, _login, _getSingleImage, _updateDescription } = require('../model/model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '120s';



// Upload File
const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const { key, mimetype, location, originalname } = req.file;
    const { description, isPublic } = req.body;
    
    // Ensure userId is available in the request object
    const userId = req.userId; // Assuming userId is added by the verifyToken middleware
    
    try {
        // Pass userId to _uploadSingle function
        const row = await _uploadSingle({ key, mimetype, location, originalname, description, userId, isPublic});
        res.status(200).json(row);
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};




//get single image
const getSingleImage = async (req, res) => {
    try { 
        const { id } = req.params;
        const row = await _getSingleImage(id);
        res.status(200).json(row);
    } catch (error) {
        console.error('Error getting single image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}


//update description
const updateDescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, isPublic } = req.body;  //include isPublic in the request body
        const row = await _updateDescription(id, description, isPublic); // Update description and isPublic
        res.status(200).json(row);
    } catch (error) {
        console.error('Error updating description:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
// Get All user Images
const getUserImages = async (req, res) => {
    // console.log(req);
    const userId = req.userId; // Use req.userId instead of req.user_id
    try {
        const rows = await _getUserImages(userId);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Error from controller' });
    }
};

// Delete Image
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        //delete from s3 bucket
        // const s3Params = {
        //     Bucket: 'usergallary',
        //     Key: 
        // };
        // await s3.send(new DeleteObjectCommand(s3Params));
        const row = await _deleteImage(id);
        res.status(200).json(row);
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Register User
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const lowermail = email.toLowerCase();
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = await _register({ username, email: lowermail, password: hashedPassword });
        res.json(newUser);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Register failed in controller' });
    }
};

// Login User
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await _login(email.toLowerCase());
        
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
            
        }
// console.log(user.id, user.email);
        const accessToken = jwt.sign(
            { id: user.id, email: user.email},
            ACCESS_TOKEN_SECRET,
            { expiresIn: '120s' }
        );
        console.log(accessToken);
        res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: 2 * 60 * 1000,
        });

        res.json({ token: accessToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed from controller' });
    }
};



module.exports = { uploadFile, getUserImages, deleteImage, register, login, getSingleImage, updateDescription };








