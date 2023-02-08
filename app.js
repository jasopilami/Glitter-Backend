const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { Client } = require("pg");
const pgClient = new Client({
  user: "postgres",
  database: "glitter",
  password: "postgres",
  port: "5432",
  host: "localhost",
});

app.use(cors());
app.use(express.json());

pgClient.connect();

app.get("/glitts", (req, res) => {
  pgClient
    .query(
      "SELECT text, u.name FROM glitts inner join users u on u.id = user_id;"
    )
    .then((results) => {
      res.send(results.rows);
    });
});

app.post("/glitts", (req, res) => {
  const { text } = req.body;
  pgClient
    .query(`insert into glitts(user_id, text) values($1, $2) returning *`, [
      1,
      text,
    ])
    .then((result) => {
      res.status(201).send(result.rows[0]);
    });
});

// app.get("/glitts/:user", (req, res) => {
//   const { user } = req.params;
//   res.send(allGlitts.filter((gl) => gl.user == user));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
