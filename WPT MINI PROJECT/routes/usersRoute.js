const express = require('express') //The Express framework, which is used to create the router and define routes.
const User = require('../models/User') // A Mongoose model representing the user collection in the database. This model is used to interact with the user data.
const router = express.Router()  //This is used to define routes that will handle HTTP requests.

router.post('/login', async function (req, res) {
    try {
        const result = await User.findOne({email: req.body.email, password: req.body.password}); //This searches the User collection for a document with the specified email and password.
        if (result) {
            res.send(result);
        } else {
            res.status(500).json('Error');
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/register', async function (req, res) {
    try {
       const newuser = new User(req.body); //This creates a new User instance with the data from the request body.
       await newuser.save();  //This saves the new user document to the database
       res.send('User Registered')
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;