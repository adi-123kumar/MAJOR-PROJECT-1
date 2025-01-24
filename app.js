const express = require("express")
const mongoose = require("mongoose")
const Listing = require("./models/listing")
const Review = require("./models/review")
const listings = require("./routes/listing.js")
const reviews =require("./routes/review.js")
const path = require("path")
const { truncate } = require("fs")
const { resolve6 } = require("dns")
const { listingSchema ,reviewSchema} = require("./schema.js")
const ejsMate = require("ejs-mate")

const methodOverride = require("method-override")
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const app = express()
app.use(methodOverride("_method"));
const session = require("express-session")
const flash = require("connect-flash")

const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")

// it is use to make templates
app.engine("ejs", ejsMate)



app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, "public")))

// creating the connection with the database
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
async function main() {
  await mongoose.connect(MONGO_URL)
}

main().then(() => {
  console.log("connection successfull with database")
})
  .catch((err) => {
    console.log("connection failed with the database")
  })

  const sessionOption = {
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true,
    },
  };
  app.get("/", (req, res) => {
    res.send("hi i am root")
  })
  

  app.use(session(sessionOption))
  app.use(flash())

  // code for authentication
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()))

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  


  app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    console.log(res.locals.success)
    next();
  })

  app.get("/demouser",async(req,res)=>{
    let fakeUser = new User({
      email:"adityarishu134@gmail.com",
      username:"aditya kumar"
    })
    let registeredUser = await User.register(fakeUser,"helloworld")
    res.send(registeredUser);
  })



// using listings route here
app.use("/listings",listings);
// using review route here
app.use("/listings/:id/reviews",reviews);


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found"))
})
app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.render("./listings/error.ejs", { err });
})

app.listen(3000, () => {
  console.log("app is listining to port 3000")
})



