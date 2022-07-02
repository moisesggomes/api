const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

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
const idList = [author.id];

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
  idList.push(ID);
  newUser.age = Number(newUser.age);
  console.log(newUser);
  users.push(newUser);

  res.set({ "Content-type": "text/plain" });
  res.send(`User ${newUser.name} created`);
});

app.route("/users").put((req, res) => {
  const body = req.body;
  body.id = Number(body.id)
  if (body.target == "age")
    body.newValue = Number(body.newValue);

  if (idList.indexOf(body.id) == -1) {
    res.send("ID not found :(");
    return;
  }

  const userIndex = users.findIndex(user => {
    return user.id == body.id ? true : false;
  });
  users[userIndex][body.target] = body.newValue;

  res.send(`${body.target} of user ${users[userIndex].name} updated!`);
});