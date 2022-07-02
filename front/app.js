const http = require("http");
const fs = require("fs");

const host = process.argv[2];
const port = 8000;

const app = http.createServer((req, res) => {
  if (req.url === "/main.js") {
    res.writeHead(200, { "Content-type": "text/javascript" });
    res.end(fs.readFileSync("main.js"));
    return;
  }
  res.writeHead(200, { "Content-type": "text/html" });
  res.end(fs.readFileSync("index.html"));
});
app.listen(port, host, () => console.log(`Server is running on 'http://${host}:${port}'`));
