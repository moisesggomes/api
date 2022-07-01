const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res) => {
  if (req.url === "/main.js") {
    res.writeHead(200, { "Content-type": "text/javascript" });
    res.end(fs.readFileSync("main.js"));
    return;
  }
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(fs.readFileSync("index.html"));
});
app.listen(8000, () => console.log("Server is running on 'http://localhost:8000'"));
