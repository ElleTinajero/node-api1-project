//created package.json with gitinit
//added server script: nodemon
//created gitignore file ?
//created index.js file
//npm install express
const express = require("express") //import express 

const server = express() //created express server

server.use(express.json()) //parse json request bodies

server.listen(6000, () => {
    console.log("server started on port 6000")
})

const db = [ //created simple database for user schema
    {
        id: 1,
        name: "Michelle",
        bio: "Hello, I love cats!",
    },
    {
        id: 2,
        name: "Matt",
        bio: "Hello, I love guitars!",
    },
    {
        id: 3,
        name: "Stella",
        bio: "Hello, I love food!",
    }
]

server.get('/', (req, res) => {
    res.json({ message: "Hello World "})  //testing out that insomnia works
})

server.get("/users", (req, res) => {
    const users = db
    if (users) {
        res.json(users)
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved"})
    }
})

server.get("/users/:id", (req, res) => {
    //the param variable matches up to the name of our URL
    const id = req.params.id
    const user = db.body(id) //get a specific user by their id from the db

    //make sure system dont break if user doesnt exist
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist"})
    } 

    if (user) {
        res.json(user)
    } else {
        res.status(505).json({ message: "The user information could not be retrieved"})
    }
})

server.post("/users", (req, res) => {
    const newUser = db({
        name: req.body.name,
        bio: req.body.bio
    })
    res.status(201).json(newUser)
})


