const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb+srv://alu:My_journey%40ALU@cluster0.cwxw1me.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once("open", () => console.log("Connected to Mongdb!!!!"));


const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDb = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state},
            ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)})}`
        })
                await camp.save();       
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});