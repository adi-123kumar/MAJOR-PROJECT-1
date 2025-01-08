const mongoose = require("mongoose")
const initData = require("./data")

const Listing = require("../models/listing")

// creating the connection with the database
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
async function main(){
  await  mongoose.connect(MONGO_URL)
}

main().then(()=>{
    console.log("connection successfull with database")
})
.catch((err)=>{
    console.log("connection failed with the database")
})


const initDB = async()=>{
    // deleting all the previous data from the database
    await Listing.deleteMany({});
    // inserting new data
    await Listing.insertMany(initData.data)
    console.log("data was initialized")

}
initDB()
