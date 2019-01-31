const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountDataSchema = new mongoose.Schema({
    Time: {type: Date, required: true},
    peopleCount: {type: Date, required: true},
    happiness: [{value: Number, count:Number}]
});

const SensorSchema = new mongoose.Schema({
    placement: {type: String, required: true},
});

const SubSectionSchema =  new mongoose.Schema({
    name: {type: String, required: true},
    sensors:[SensorSchema],
    data:[CountDataSchema],
});

const SectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    subsections: [SubSectionSchema]
});


module.exports = mongoose.model('Section', SectionSchema);
