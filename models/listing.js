const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Review = require("./review")
const User = require("./user")
const listingSchema = Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:String,
        filename:String
        
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})
// removing all the reviews after deletion on the a particular listing from the review collection
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});


const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing;