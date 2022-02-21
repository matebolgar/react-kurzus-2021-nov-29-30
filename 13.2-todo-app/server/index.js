const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PATCH",
};
const msg = (req) => `Request érkezett:\n "${req.url}" URL-re,\n ${req.method} methoddal.\n -----------------`;

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    if (req.method === "OPTIONS") {
      res.writeHead(200, headers);
      res.end();
      return;
    }

    console.log(msg(req));
    if (parsedUrl.pathname === "/teendok" && req.method === "GET") {
      setTimeout(() => {
        res.writeHead(200, headers);
        fs.createReadStream("./teendok.json").pipe(res);
      }, 200);
      return;
    }

    if (parsedUrl.pathname === "/teendok" && req.method === "PATCH") {
      const query = querystring.parse(parsedUrl.query);
      if (!query.id) {
        res.writeHead(400, headers);
        res.write(JSON.stringify({ error: "id required" }));
        res.end();
        return;
      }

      const chunks = [];
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => {
        const data = Buffer.concat(chunks);
        const body = JSON.parse(data.toString());

        fs.readFile("./teendok.json", (err, file) => {
          const items = JSON.parse(file);
          const i = items.findIndex((item) => item.id == query.id);
          items[i].isCompleted = body.isCompleted;
          setTimeout(() => {
            fs.writeFile("./teendok.json", JSON.stringify(items), (err) => {
              res.writeHead(200, headers);
              res.write(JSON.stringify(items[i]));
              res.end();
            });
          }, 500);
        });
      });
      return;
    }

    res.writeHead(404, headers);
    res.write(JSON.stringify({ error: "not found" }));
    res.end();
  })
  .listen(8080);
  console.log('Szerver megszólítható a \n "http://localhost:8080" URL-en');
