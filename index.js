const express = require("express");

const server = express();

server.use(express.json());

const users = ["Lucas", "Ocraus", "Leomax"];

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required!" });
  }
  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/user/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.post("/user", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put("/user/:index", checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/user/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  return res.send();
});
server.listen(3000);
