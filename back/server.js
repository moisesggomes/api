const express = require("express");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With,content-type, Authorization"
  });
  next();
});

const port = 8001;
const host = typeof process.argv[2] == "undefined" ? "localhost" : process.argv[2];
app.listen(port, host, () => console.log(`API is running on 'http://${host}:${port}'`));

const users = [
  {
    id: 1,
    name: "Moises Gomes",
    age: 23,
    city: "Niterói"
  },
  {
    id: 2,
    name: "Mons Drago",
    age: 20,
    city: "New York"
  },
  {
    id: 3,
    name: "Fabricio Ramos",
    age: 28,
    city: "Calcutá"
  },
  {
    id: 4,
    name: "Roberta Ribeiro",
    age: 19,
    city: "Londres"
  }
];
let ID = users[users.length - 1].id;

app.route("/").get((req, res) => res.send("<h1>Go to <a href='/users'>users</a></h1>"));

app.route("/users").get((req, res) => res.json(users));

app.route("/users/:id").get((req, res) => {
  const userID = req.params.id;
  const user = users.find(user => Number(userID) === Number(user.id));
  if (!user) {
    return res.json("User not found :(");
  }
  res.json(user);
});

app.route("/users").post((req, res) => {
  const newUser = {
    id: ++ID,
    ...req.body,
    age: Number(req.body.age)
  };
  users.push(newUser);

  res.json("New user created");
});

app.route("/users/:id").put((req, res) => {
  const userID = req.params.id;

  const user = users.find(user => Number(userID) === Number(user.id));
  const userIndex = users.findIndex(user => Number(userID) === Number(user.id));

  if (!user) {
    return res.json("User not found :(");
  }

  const updatedUser = {
    ...user,
    name: req.body.name,
    age: req.body.age,
    city: req.body.city
  };

  users[userIndex] = updatedUser;
  res.json("User updated");
});

app.route("/users/:id").patch((req, res) => {
  const userID = req.params.id;

  const userIndex = users.findIndex(user => Number(userID) === Number(user.id));
  if (userIndex === -1) {
    return res.json("User not found");
  }

  users[userIndex][req.body.target] = req.body.newValue;

  res.json("Field updated");
});

app.route("/users/:id").delete((req, res) => {
  const userID = req.params.id;

  const userIndex = users.findIndex(user => Number(userID) === Number(user.id));
  if (userIndex === -1) {
    return res.json("User not found :(");
  }

  users.splice(userIndex, 1);

  res.json("User deleted");
});
