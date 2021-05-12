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

//bcrypt for generating password hash
const bcrypt = require('bcrypt');
const saltRounds = 10;

//api key used by admins to delete posts
const superSecretApiKey = "123456";

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

    //validate sent api key 
    if(req.query.apiKey == superSecretApiKey){
        db.run(sql, [id], (err) => {
            //throw http status 400 and return json error message if there is a database error 
            if(err){
                res.status(400).json({"error": err.message});
            }
            else{
                res.json({"result": "deleted"});
            }
        });
    }
    else{
        res.status(400).json({"error": "wrong or missing api key"});
    }
});

//post request for saving a new post
app.post("/api/posts", (req, res) =>{
    console.log("posts accessed");
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

//get request for authenticating user and returning api key
app.post("/api/auth", (req,res) =>{

    username = req.body.username;
    plainTextPassword = req.body.password;

    // get username from db
    sql= "SELECT * FROM admin WHERE username = ? LIMIT 1";
    db.get(sql, username, (err, admin) => {
        if(err){
            res.status(400).json({"error": err.message});
        }
        else{
            if(admin == undefined){
                res.json({"error": "credentials wrong"}); 
            }
            else{
                savedHash = admin.password_hash
                // compare db hash with password from request
                bcrypt.compare(plainTextPassword, savedHash, function(err, result){
                    if(result == true){
                        res.json({"apiKey": superSecretApiKey});
                    }
                    else{
                        res.json({"error": "credentials wrong"});
                    }
                });
            }
        }
    });
});



//start listeing on specified port
app.listen(port, () => {
    console.log("Guestbook backend listening at http://localhost:" + port);
});