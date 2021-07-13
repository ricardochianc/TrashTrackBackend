const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('../models/user');

router.post('/verify', async (req, res) => {
    try {
        const data = await googleAuth(req.body.tokenId);

        let userFound = await User.findOne({ Email: data.email }).exec();
        
        if (userFound != null) {
            res.status(200).json({ found: true });
        }
        else {
            res.status(200).json({ found: false, email: data.email });
        }

    } catch (error) {
        res.status(400).json({ error });
    }
});

const googleAuth = async (tokenId) => {
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, name, picture } = payload;
    const userId = sub;

    return {userId, email, fullName : name, photoUrl: picture}
};

module.exports = router;