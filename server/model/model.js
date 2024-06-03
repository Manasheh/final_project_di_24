const { db } = require('../config/config.js');

//getallusers
// const _all = async () => {
//     try {
//         const users = await db('gallaryusers').select('id', 'email').orderBy('id');
//         // return users;
//         console.log(users);
//     } catch (error) {
//         console.log({message: 'error in get all users'});
//         throw new Error('Could not get all users')
//     }
// }

const _uploadSingle = async ({ key, mimetype, location, originalname, description, userId }) => {
    try {
        const [row] = await db('images')
            .insert(
                {
                    user_id: userId,
                    image_url: location,
                    description: description || '',  // Use provided description or default to an empty string
                    
                    uploaded_at: new Date(),
                },
                ['id', 'user_id', 'image_url', 'description', 'uploaded_at']  // Returning these fields after insertion
            );
        return row;
    } catch (error) {
        console.error('Error inserting into the images table:', error);
        throw new Error('Database insertion error');
    }
};


//get single image
const _getSingleImage = async (id) => {
    try {
        const row = await db('images').select('id', 'image_url', 'description').where({id}).first();
        return row;
    } catch (error) {
        console.error('Error getting single image:', error);
        throw new Error('Database error getting single image');
    }
}


//update description
const _updateDescription = async (id, description) => {
    try {
        const [row] = await db('images').where({ id }).update({ description }, ['id', 'description']);
        return row;
    } catch (error) {
        console.error('Error updating description:', error);
        throw new Error('Database error updating description');
    }
}
const _getUserImages = async (userId) => {
    try {
        //fetch image associated with the user id
        const rows  = await db('images').select('id', 'image_url', 'description').where({user_id: userId});
        return rows;
    } catch (error) {
        console.error('Error getting images:', error);  // Log the error
        throw new Error('error from model to upload file');  // Throw an error
    }
}

const _deleteImage = async (id) => {
    return db('images').where({ id }).del();
}

const _register = async ({username, email, password}) => {
    try {
        const [user] = await db('gallaryusers').insert({username, email, password}, ['username', 'email', 'password'])
        return user;
    } catch (error) {
        throw new Error('Register failed in model')
    }
}

const _login = async (email) => {
    try {
        const user = await db('gallaryusers')
        .select('id', 'email', 'password')
        .where({email}).first()

        // console.log('jdaof ',user);
        return user || null;
    } catch (error) {
        throw new Error('Login failed from model')
    }
}
    module.exports = { _uploadSingle, _getUserImages, _deleteImage, _register, _login, _getSingleImage, _updateDescription};
















// const { db } = require('../config/config.js')

// const _uploadSingle = async ({key, mimetype, location, originalname}) => {
//     return db('images').insert({key, mimetype, location, originalname}, ['key', 'mimetype', 'location', 'originalname'])
// }

// module.exports = { _uploadSingle }