//created package.json with gitinit
//added server script: nodemon
//created gitignore file ?
//created index.js file
//npm install express
const express = require("express") //import express 
const db = require("./database")

const server = express() //created express server

server.use(express.json()) //parse json request bodies

server.listen(6000, () => {
    console.log("server started on port 6000")
})

server.get('/', (req, res) => {
    res.json({ message: "Hello World "})  //testing out that insomnia works
})

server.get("/users", (req, res) => {
    const users = db.getUsers() //creating users and setting it equal to the database
    if (users) {                //that was imported above,  getUsers is a function in that db we are calling
        res.json(users) //the response is going to be users in json format
    } else { //if not 
        res.status(500).json({ errorMessage: "The users information could not be retrieved"}) //return this
    }
})

server.get("/users/:id", (req, res) => {
    //the param variable matches up to the name of our URL
    const id = req.params.id
    const user = db.getUserById(id) //get a specific user by their id from the db

    //make sure system dont break if user doesnt exist
    if (user) { 
        res.json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist"})
    } 

    if (user) {
        res.json(user) //can I do else if if else? Or is there a way to shorten this?
    } else {
        res.status(505).json({ message: "The user information could not be retrieved"})
    }
})

server.post("/users", (req, res) => {
    const newUser = db.createUser({ //creating a new user variable and setting it equal to db function
        name: req.body.name, //this is the json that is needed to create the user
        favoritecolor: req.body.favoritecolor,
    })
    
    res.status(201).json(newUser)

    if (!req.body.name || !req.body.favoritecolor) { //if it is missing something it will give an error
        return res.status(400).json({
            message: "Missing name or favorite color"
        })
    } else {
        res.status(500).json({ message: "There was an error while saving the user to the database" }) //else it just wont work
    }
})

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)
    db.deleteUser(req.params.id)
    
    if (user) {
        db.deleteUser(req.params.id)
   
    //since we have nothing to return back to the client, send a
    //204 with an empty response
    //204 just means success but we have nothing to return
    res.status(204).end
     } else {
         res.status(404).json({
             message: "User not found",
         })
     }
})

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id)

    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name,
            name: req.body.favoritecolor
        })

        res.json(updatedUser)
    } else {
        res.status(404).json({
            message: "user not found"
        })
    }
})