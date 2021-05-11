const sqlite3 = require('sqlite3');

//bcrypt for generating password hash
const bcrypt = require('bcrypt');
const saltRounds = 10;

//sqlite file location/name
const DB_NAME = './guestbook.db';

//open database connection or create new database file if not found
let db = new sqlite3.Database(DB_NAME, (err)=>{
    //print error to browser console
    if(err){
        console.log("Error");
    }
});

//serialize ensured that each command is executed and finished after each other
db.serialize(()=> {

    //create post table
    sql = 'CREATE TABLE post (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, message TEXT NOT NULL, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)';
    db.run(sql, (err)=>{
        //if table exists already
        if(err){
            console.log("Table already exists");
        }
        else{
            console.log("Created Table")
        }
    });

    //dummy entry

    // sql = 'INSERT INTO post (name, message) VALUES(?,?)';
    // db.run(sql, ["Tobias Schranz", "Ich finde die Cookis GmbH cool!"]);

    
    //create admin table
    sql = 'CREATE TABLE admin (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password_hash TEXT NOT NULL)';
    db.run(sql, (err)=>{
        //if table exists already
        if(err){
            console.log("Table already exists");
        }
        else{
            console.log("Created Table")
        }
    });

    //dummy entry
    //normally there would be a registration page on the frontend

    // sql = 'INSERT INTO admin (username, password_hash) VALUES(?,?)';
    // const plainTextPassword = "SuperSicheresPassword123";

    //generate password hash and store dummy entry in db

    // bcrypt.hash(plainTextPassword, saltRounds, function(err, hash){
        
    //     console.log(hash);
    //     db.run(sql, ["tobias.schranz", hash], (err) =>{
    //         console.log(err)
    //     });
    // })

})

//export nodejs module to be imported in app.js
module.exports = db; 