const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Review = require("./review")

const listingSchema = Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/157579910/photo/the-beach.jpg?s=2048x2048&w=is&k=20&c=ZUR-RzIYa6Cz5dcHzXED49D_evIPbJElchb5QhQQ7aM=",
        set:(v)=> v===""?"https://media.istockphoto.com/id/157579910/photo/the-beach.jpg?s=2048x2048&w=is&k=20&c=ZUR-RzIYa6Cz5dcHzXED49D_evIPbJElchb5QhQQ7aM=":v
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ]
})
// removing all the reviews after deletion on the a particular listing from the review collection
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});


const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing;