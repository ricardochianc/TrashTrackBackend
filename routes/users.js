const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

router.post('/create', async (req, res) => {
    
    try {
        const new_user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Address: req.body.Address
        });

        await new_user.save();
        res.status(200).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ error: error }); //error.keyValue.Email
    }
});

module.exports = router;