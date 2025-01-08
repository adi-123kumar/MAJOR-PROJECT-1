const mongoose = require("mongoose")
const Schema = mongoose.Schema

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
    country:String
})

const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing;