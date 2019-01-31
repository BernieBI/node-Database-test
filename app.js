var mongoose = require('mongoose');
var env = require('dotenv').load();    //Use the .env file to load the variables

mongoose.connect(process.env.COSMOSDB_CONNSTR+"?ssl=true&replicaSet=globaldb", {
  auth: {
    user: process.env.COSMODDB_USER,
    password: process.env.COSMOSDB_PASSWORD
  }
})

.then(() => console.log('Connection to CosmosDB successful'))
.catch((err) => console.error(err));

const Section = require('./models/section.model');
const User = require('./models/user.model');

/*
const Common = require('./models/common.model');
const Section = Common.SectionType;
const User = Common.UserType;
*/

Section.find({ 'name' : "Capgemini avd. Sarpsborg"}, function(err, foundSection){
  foundSection.forEach(section => console.log("Found Family (using discriminator): " + JSON.stringify(section)));
});


/************ sample data to db**************/
var now = new Date();
const section = new Section({
  name: "Capgemini avd. Fredrikstad",
  subsections: [
  {
    name: "2. etasje",
    sensors: [{ placement: "Ved veranda"},{ placement: "Bakdør"}],
    data:[
      {
        Time: now,
        peopleCount: 12,
        happiness: [{value:5, count: 20}, {value:3, count:34}]
      }
    ]
},
  {
    name: "1. etasje",
    sensors: [{ placement: "hovedinngang"},{ placement: "Bakdør"}],
    data:[
      {
        Time: now,
        peopleCount: 12,
        happiness: [{value:4, count: 12}, {value:2, count:56}]
      }
    ]
}],
});

section.save((err, saveSection) => {
  console.log(JSON.stringify(saveSection));
});


const user = new User({
  userName: "Testbruker",
  password: "passord",
});


user.save((err, saveUser) => {
  console.log(JSON.stringify(saveUser));
});

