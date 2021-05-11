const express = require("express")
const app = express()
//listen on port
const port = 3000

//import dabase driver
const db = require("./database.js")

//use body parser for parsing json body requests
const bodyParser = require('body-parser')
app.use(bodyParser.json());

//use cors for cross-origin usage
const cors = require('cors')
app.use(cors());

//get request for all posts
app.get("/api/posts/", (req, res) => {

    sql= "SELECT * FROM post";
    db.all(sql, [], (err, posts)=>{
        //throw http status 400 and return json error message if there is a database error 
        if(err){
            res.status(400).json({"error": err.message});
        }
        else{
            res.json(posts);
        }
    });
});

//delete request for deleting a single post
app.delete("/api/posts/:id", (req, res) =>{
    sql = "DELETE FROM post WHERE id = ?";
    id = req.params.id;
    db.run(sql, [id], (err) => {
        //throw http status 400 and return json error message if there is a database error 
        if(err){
            res.status(400).json({"error": err.message});
        }
        else{
            res.json({"result": "deleted"});
        }
    });
});

//post request for saving a new post
app.post("/api/posts", (req, res) =>{
    console.log("accessed");
    sql = "INSERT INTO post (name, message) VALUES(?,?)";
    values = [req.body.name, req.body.message]
    db.run(sql, values, (err) => {
        //throw http status 400 and return json error message if there is a database error 
        if(err){
            res.status(400).json({"error": err.message});
        }
        else{
            res.json({"result": "created"});
        }
    });
});

//start listeing on specified port
app.listen(port, () => {
    console.log("Guestbook backend listening at http://localhost:${port}");
});