const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/firmware", require("./routes/firmwareRoutes"));

mongoose.connect("mongodb://neil:neilop07comrade@ac-ffcp5mc-shard-00-00.ehkjsse.mongodb.net:27017,ac-ffcp5mc-shard-00-01.ehkjsse.mongodb.net:27017,ac-ffcp5mc-shard-00-02.ehkjsse.mongodb.net:27017/?ssl=true&replicaSet=atlas-aaiapi-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => console.log("Server running on 5000"));