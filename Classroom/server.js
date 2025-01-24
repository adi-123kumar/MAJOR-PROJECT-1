const express = require("express")

const app = express()
app.get("/getcookies",(req,res)=>{
    res.cookie("shoes",1000);
    res.cookie("belt",200);
    res.send("cookies page")
})

app.get("/",(req,res)=>{
    res.send("root page")
})
// user route
app.get("/users",(req,res)=>{
    res.send("all user page")
})
app.get("/users/:id",(req,res)=>{
    res.send("particular user page")
})

app.post("/users",(req,res)=>{
    res.send("post req for user")
})
app.delete("/users/:id",(req,res)=>{
    console.log(" delete for user id page")
})
// post routes
app.get("/post",(req,res)=>{
    res.send("all post page")
})
app.get("/post/:id",(req,res)=>{
    res.send("particular post page")
})

app.post("/post",(req,res)=>{
    res.send("post req for post")
})
app.delete("/post/:id",(req,res)=>{
    console.log(" delete for post id page")
})


app.listen(3000,()=>{
    console.log("app is listining to 3000")
})