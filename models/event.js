const { Schema, model } = require('mongoose');

//1 = si se decta continuidad
//0 si se interrumpe
const eventSchema = new Schema({
    description: String,
    time: String
});

module.exports = model('Event', eventSchema);