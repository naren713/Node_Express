const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const todos = [
    { id: 1, title: "Rent a car" },
    { id: 2, title: "Buy the book" },
    { id: 3, title: "Feed the dog" },
];

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send(todos);
});

app.post("/", (req, res) => {
    const newTodo = { id: req.body.id, title: req.body.title };
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    res.status(201).json(todos);
});

app.put("/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var UpdatedNewTodo = { id: id, title: req.body.title };
    todos[id - 1] = UpdatedNewTodo;
    res.status(201).json(todos);
});

app.delete("/:id", (req, res) => {
    var id = parseInt(req.params.id) - 1;
    delete todos[id];
    res.status(201).json(todos);
});

app.listen(3000, () => console.log("Server Started..."));