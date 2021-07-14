const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const jsonBodyParser = express.json();

router.post('/push', jsonBodyParser, async (req, res) => {
    if (req.query.token !== process.env.PUBSUB_VERIFICATION_TOKEN) {
        res.status(401).send();
        return
    }

    try {
        const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
        let description;
        let time;

        if (message.includes(',')) {

            if (message.split(',')[0].split('=')[1] === '0') {
                description = 'Interrupción de continuidad';
            }
            else if (message.split(',')[0].split('=')[1] === '1') {
                description = 'Ha reiniciado la continuidad';
            }

            time = message.split(',')[1].split('=')[1]
        }
        else {
            description = message;
            time = 'N/A';
        }

        const new_event = new Event({
            description: description,
            time: time
        });

        await new_event.save();
        res.status(200).json({ message: 'Event created' });
    } catch (error) {
        res.status(400).json({ error: error });
    }
});

router.get('/getEvents', (req, res) => {    
    const events = await Event.find();
    res.status(200).json(events);
});

module.exports = router;