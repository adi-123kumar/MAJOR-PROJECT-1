const express = require("express")
const mongoose = require("mongoose")
const Listing = require("./models/listing")
const path = require("path")
const { truncate } = require("fs")
const { resolve6 } = require("dns")
const app = express()
const ejsMate = require("ejs-mate")
const methodOverride = require("method-override")
app.use(methodOverride("_method"));

// it is use to make templates
app.engine("ejs",ejsMate)



app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))

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


app.get("/",(req,res)=>{
    res.send("hi i am root")
})
// index route
app.get("/listings",async(req,res)=>{
  const allListings=  await Listing.find({})
  res.render("./listings/index.ejs",{allListings})
})
// new route
app.get("/listings/new",(req,res)=>{
  res.render("./listings/new.ejs")
})
// show listings
app.get("/listings/:id",async(req,res)=>{
  let {id}= req.params;
 const listing = await Listing.findById(id)
 res.render("./listings/show.ejs",{listing})
})

// create route]
app.post("/listings", (req,res)=>{
 console.log(req.body.listing)
 let newData = new Listing(req.body.listing)
 newData.save()
 .then((result)=>{
  console.log("new data saved succssfully")
 })
 .catch((err)=>{
  console.log("data not saved")
 })
res.redirect("/listings")

})

app.get("/listings/:id/edit",async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/edit.ejs",{listing})
})

app.put("/listings/:id",async(req,res)=>{
  let {id} = req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing})
 res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id",async (req,res)=>{
  let {id}=req.params;
 let deletedListing =  await Listing.findByIdAndDelete(id)
 console.log(deletedListing)
  res.redirect("/listings")
})
// app.get("/testListing",async (req,res)=>{
//  let sampleListing =  new Listing({
//     title:"My New villa",
//     decription:"By the beach",
//     price:1200,
//     location:"Calnagute, Goa",
//     country:"India"
//  })
//  await sampleListing.save()
//  console.log("sample was saved")
//  res.send("successfull testing")
// })

app.listen(8080,()=>{
    console.log("app is listining to port 8080")
})