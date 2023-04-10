const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
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

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// ROUTING 

app.get('/', (req, res) => {
    res.render("home");
})


app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
})


app.get('/campgrounds/new', (req, res) => {
    res.render("campgrounds/new");
})


app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body);
    await campground.save();
   
})


app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", {campground})
});


app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", {campground})
});

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
  res.redirect(`/campgrounds/${campground._id}`);
})

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.body.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})


app.listen(4000, () => {
    console.log('listening on port 4000!');
});

