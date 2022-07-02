const express = require("express");
const app = express();
app.use(express.json());
app.listen(8001, "10.0.0.108", () => console.log("API is running on 'http://10.0.0.108:8001'"));

let ID = 1;
const author = {
  id: ID,
  name: "Moises Gomes",
  age: 23,
  city: "Niterói",
};
const users = [author];

app.route("/").get((req, res) => res.send("<h1>Go to <a href='/users'>users</a></h1>"));

app.route("/users").get((req, res) => res.send(JSON.stringify(users)));
app.route("/users/:id").get((req, res) => {
  let responseSended = false;
  users.forEach((user, index) => {
    if (user.id == req.params.id) {
      res.send(JSON.stringify(users[index]));
      responseSended = true;
    }
  });
  if (!responseSended) {
    res.send("User not found :(");
  }
});

app.route("/users").post((req, res) => {
  const newUser = req.body;
  console.log(newUser);
  newUser.id = ++ID;
  users.push(newUser);
  try {
    res.send(`User ${newUser.name} created`);
  } catch(error) {
    console.log(error)
    res.send("Sorry, I couldn't create a new User :(");
  }
});
