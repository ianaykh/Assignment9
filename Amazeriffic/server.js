var express = require("express"),
    http = require("http"),
    socket = require("socket.io");
app = express();
var server = http.createServer(app);
// import the mongoose library
mongoose = require("mongoose"),

    app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

// connect to the amazeriffic data store in mongo
mongoose.connect('mongodb://localhost/amazeriffic');

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

// http.createServer(app).listen(3000);
var server = http.createServer(app, function(req, res) {
    console.log("Server has started");
});
var io = socket(server);
io.on("connection", function(socket) {
    console.log("Connected");
});




server.listen(3000, function() {
    console.log("server listening on 3000");
});



app.get("/todos.json", function(req, res) {
    ToDo.find({}, function(err, toDos) {
        res.json(toDos);
    });
});

app.post("/todos", function(req, res) {
    console.log(req.body);
    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });
    newToDo.save(function(err, result) {
        if (err !== null) {
            // the element did not get saved!
            console.log(err);
            res.send("ERROR");
        } else {
            // our client expects *all* of the todo items to be returned, so we'll do
            // an additional request to maintain compatibility
            ToDo.find({}, function(err, result) {
                if (err !== null) {
                    // the element did not get saved!
                    res.send("ERROR");
                }

                res.json(result);
            });
        }
    });
});
