// bring in the express module to use in this app
const express = require("express");
const req = require("express/lib/request");

// get an app instance using the express framework
const app = express();

app.use(express.json());

const PORT = 8000;

app.all("/hello", function(req, res) {
    res.send("hi");
});

// this is an example of a PATH PARAMETER
// the colon : is a placeholder, or variable name
app.get("/hello/:name", function(req, res) {
    // to get the specific name || id, use req.params
        // name === name || id === id
    // put the name in a variable, get the name from params
    let input = req.params.name;
    // respond with concatenation of hi and the input variable
    res.send("hi " + input);
});

// this is an example of a REQUEST BODY
// when getting info from client, focus on 3 things
    // 1. what's the VERB?
    // 2. what's the PATH
    // 3. when you get a request for the VERB on the PATH, WHAT DO YOU WANT IT TO DO?
app.post("/hi", function(req, res) {
    // print to show that we're in a POST request
    console.log("POST /hi");
    let input = req.body;
    console.log("Request body = ", input);
    res.send("Hi " + input.name);
});


let list = [];

// return the entire list on the response
app.get("/list", function(req, res) {
    console.log("GET /list");
    res.json(list);
});

// delete the item from the list
app.delete("/list/:pos", function(req, res) {
    console.log("DELETE /list/:id");
    let deleted = list.splice(req.params.pos, 1);
    res.json(deleted);
});

// add an item to the list
app.post("/list", function(req, res) {
    console.log("POST /list");
    let input = req.body;
    // list.push(input.json());
    list.push(input);
    res.sendStatus(202);  // example of how to send a code, but non text
});

//update the item at the position
app.put("/list/:pos", function(req, res) {
    console.log("PUT /list", req.params.pos);
    let input = req.body;
    let pos = req.params.pos;
    list(pos) = input;
    // example of how to send a code, but no addititional info
    res.sendStatus(202);
});



app.listen(PORT, function() {
    console.log("Express Server started and is listening on PORT", PORT);
});

