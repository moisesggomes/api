const express = require("express");
const app = express();
app.use(express.static("./public"));

app.set("view engine", "ejs");

const host = typeof process.argv[2] == "undefined" ? "localhost" : process.argv[2];
const port = 8000;

app.get("/", (req, res) => {
  res.render("index.ejs", { host });
});

app.listen(port, host, () => console.log(`Server is running on 'http://${host}:${port}'`));
