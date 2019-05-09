const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  console.log(links);
  res.render("links/list", { links });
});

router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { title, url, description } = req.body;
  const newLink = { title, url, description };
  console.log(newLink);
  const respuesta = await pool.query("INSERT INTO links SET ?", [newLink]);
  console.log(respuesta.affectedRows);
  res.redirect("/links");
});

module.exports = router;
