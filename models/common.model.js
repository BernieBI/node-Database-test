//This file is testing a method where both users and sections are stored in the same collection
const mongoose = require('mongoose');

const baseConfig = {
    discriminatorKey: "_type", //If you've got a lot of different data types, you could also consider setting up a secondary index here.
    collection: "alldata"   //Name of the Common Collection
  };
  
 var commonModel = mongoose.model('Common', new mongoose.Schema({}, baseConfig));
 

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
}, baseConfig);

module.exports.SectionType = commonModel.discriminator('SectionType', SectionSchema);

const UserSchema = new mongoose.Schema({
  userName: {type: String, required: true, max: 100},
  password: {type: String, required: true, max: 100},
  sections: [{sectionID: Number, accessLevel: Number}]
}, baseConfig);

module.exports.UserType = commonModel.discriminator('UserType', UserSchema);

