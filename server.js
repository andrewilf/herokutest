const express = require('express');
const app = express();
const port = 4000
const scientists = [{name: "bob", description: "hee hoo"}]

app.use(express.urlencoded({ extended: false }))
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.listen(process.env.PORT, () => {
    console.log('hello on port: ' + port);
})

app.get("/", (req, res) => {
    res.render("index.ejs", {
        scientists: scientists,
    })
})

app.get("/new", (req, res) => {
    res.render("new.ejs", {
        //yes: MediaStreamAudioDestinationNode,
    })
})

app.post("/new", (req, res) => {
    scientists.push(req.body)
   // res.send("saved")
    res.redirect("/")
    
})

app.delete("/scientists/:index", (req, res) => {
    scientists.splice(req.params.index, 1)
    //res.send(req.params.index)
    res.redirect("/")
    
})

app.get("/scientists/:index", (req, res) => {
    //scientists.splice(req.params.index, 1)
    //res.send(req.params.index)
    res.render("edit.ejs", {
        i: req.params.index,
    })
    
})

app.put("/scientists/:index", (req, res) => {
    //scientists.splice(req.params.index, 1)
    scientists[req.params.index] = req.body
    console.log(req.body)
    //res.render("edit.ejs")
    res.redirect("/")
})

app.delete("/all", (req, res) => {
    scientists.splice(0,scientists.length)
    //res.send(req.params.index)
    res.redirect("/")
    
})