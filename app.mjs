import pkg from "pg";
const { Pool, Client } = pkg;

import express from "express";
const app = express();
app.use(express.json());
app.use(express.static("./public"));
app.listen(3000, function () {
  console.log("Server is running on localhost3000");
});


TODO: Encore trouver la version que kellian à utiliser + voir les choses à faire 