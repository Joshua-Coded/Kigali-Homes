// const mongoose = require('mongoose');
// const cities = require('./cities');
// const {places, descriptors} = require('./seedHelpers');
// const Campground = require('../models/campgrounds')


// mongoose.connect('mongodb://localhost:27017/alu-camp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connect('mongodb+srv://alu:My_journey%40ALU@cluster0.cwxw1me.mongodb.net/?retryWrites=true&w=majority',{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });


// 
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');


mongoose.connect('mongodb://localhost:27017/alu-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6446f096ce07aaddc121427e",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/joshwilly/image/upload/v1682435564/AluCamp/odn27zeecngleovdmuow.png',
                  filename: 'AluCamp/odn27zeecngleovdmuow',                  
                },
                {
                  url: 'https://res.cloudinary.com/joshwilly/image/upload/v1682435564/AluCamp/cdxog26xi2xww3wshxg6.png',
                  filename: 'AluCamp/cdxog26xi2xww3wshxg6',
                },
                {
                  url: 'https://res.cloudinary.com/joshwilly/image/upload/v1682435565/AluCamp/d4jlazo0dwyviavi6d2n.png',
                  filename: 'AluCamp/d4jlazo0dwyviavi6d2n'
                }
              ],
            
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
