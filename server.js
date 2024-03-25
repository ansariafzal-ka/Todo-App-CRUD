const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();

const Todo = require("./models/Todo")
const app = express()

//make a .env file and add your database connection uri there
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
})

const port = process.env.PORT || 5000

app.listen(port, () =>{console.log(`server started at ${port}`);})

app.set("view engine", "ejs")
app.use(express.urlencoded({extended : true}))

app.get("/", async (req, res) =>{
    const todos = await Todo.find()
    res.render("index", {todos : todos})
})

app.post("/todo", async (req, res) =>{
    await Todo.create({task : req.body.todo})
    res.redirect("/")
})

app.post("/todo/delete/:id", async (req, res) =>{
    const {id} = req.params
    await Todo.findByIdAndDelete(id)
    res.redirect("/")
})

app.post("/todo/update/:id", async (req, res) =>{
    const {id} = req.params
    const {task} = req.body
    await Todo.findByIdAndUpdate(id, {task})
    res.redirect("/")
})