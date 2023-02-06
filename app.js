const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const allGlitts = [
  { tweet: "Niko, bestere Mann!", user: "Jascha" },
  { tweet: "AWS ist Crack!", user: "Jascha" },
  { tweet: "Racker", user: "Niko" },
];

app.get("/glitts", (req, res) => {
  res.send(allGlitts);
});

app.post("/glitts", (req, res) => {
  allGlitts.push(req.body);
  res.status(201).send(req.body);
});

// app.get("/glitts/:user", (req, res) => {
//   const { user } = req.params;
//   res.send(allGlitts.filter((gl) => gl.user == user));
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
