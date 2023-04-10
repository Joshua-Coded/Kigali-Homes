const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

// connecting to MongoDB

mongoose.connect('mongodb://localhost:27017/alu-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});







const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render("home");
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: "My room", description: "My safest room"});
    await camp.save();
    res.send(camp);
})

app.listen(4000, () => {
    console.log('listening on port 4000!');
});