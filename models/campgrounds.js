const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});


ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');

})

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
    title: String,
    geometry: { type: { type: String, enum: ['Point'], required: true }, 
    coordinates: { type: [Number], required: true } },
    images: [
        {
            type: ImageSchema  
        }
    ],
    price: Number,
    description: String,
    location: String,
    author: {
            type: Schema.Types.ObjectId,
            ref: 'User'

    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
});


CampgroundSchema.post('findOneAndDelete', async function (docs) {
  if(docs){
    await Review.deleteMany({
        _id: {
            $in: docs.reviews
        }
    })
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema);