const express = require("express");
// const cors = require("cors");
const app = express();

app.use(express.json());
// app.use(cors());
app.use((req, res, next) => {
  console.log(req.body);
  res.set({
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With,content-type, Authorization"
  });
  next();
});

const port = 8001;
const host = process.argv[2];
app.listen(port, host, () => console.log(`API is running on 'http://${host}:${port}'`));

let ID = 1;
const author = {
  id: ID,
  name: "Moises Gomes",
  age: 23,
  city: "Niterói",
};
const users = [author];

app.route("/").get((req, res) => res.send("<h1>Go to <a href='/users'>users</a></h1>"));

app.route("/users").get((req, res) => res.send(users));

app.route("/users/:id").get((req, res) => {
  let responseSended = false;
  users.forEach((user, index) => {
    if (user.id == req.params.id) {
      res.send(users[index]);
      responseSended = true;
    }
  });
  if (!responseSended) {
    res.send("User not found :(");
  }
});

app.route("/users").post((req, res) => {
  const newUser = {
    id: ++ID,
    ...req.body
  };
  newUser.age = Number(newUser.age);
  users.push(newUser);

  res.set({ "Content-type": "text/plain" });
  res.send(`User ${newUser.name} created`);
});

app.route("/users").put((req, res) => {
  const body = req.body;
  body.id = Number(body.id);
  
  const userIndex = users.findIndex(user => {
    return user.id == body.id ? true : false;
  });
  if (userIndex == -1 || body.id <= 0) {
    res.send("ID not found :(");
    return;
  }

  if (body.target == "age") {
    body.newValue = Number(body.newValue);
    if (isNaN(body.newValue) || body.newValue <= 0) {
      res.send("Sorry, age is not right\nPlease be sure the 'age' field is a valid Number");
      return;
    }
  }
  users[userIndex][body.target] = body.newValue;

  res.send(`${body.target} of user ${users[userIndex].name} updated!`);
});

app.route("/users/:id").delete((req, res) => {
  const reqUserID = Number(req.params.id);
  const userIndex = users.findIndex(user => reqUserID == user.id ? true : false);
  if (userIndex <= -1) {
    res.send("User id not found :(");
    return;
  }
  res.send(`User ${users[userIndex].name} deleted`);
  users.splice(userIndex, 1);
});