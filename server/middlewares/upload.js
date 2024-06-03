const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const { s3 } = require("../config/aws.s3.config.js");
const dotenv = require("dotenv");
dotenv.config();

const upload = multer({
  storage: multerS3({
    s3,
    // acl: "public-read",
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileName = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      cb(null, `${fileName}${path.extname(file.originalname)}`);
    },
  }),
});

module.exports = upload ;


//this is only to upload files to s3 bucket now we need to create a controller to handle the file upload and save the file details to the database 


