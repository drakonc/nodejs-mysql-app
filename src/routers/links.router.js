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
  req.flash('success','Link Guardado Correctamente');
  console.log(respuesta);
  res.redirect("/links");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const respuesta = await pool.query("DELETE FROM links WHERE id = ?", [id]);
  req.flash('success', 'Link Eliminado Correctamente');
  console.log(respuesta);
  res.redirect("/links");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const link = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  console.log(link[0]);
  res.render("links/edit", { link: link[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, url, description } = req.body;
  const upLink = { title, url, description };
  console.log(upLink);
  const link = await pool.query("UPDATE links SET ? WHERE id = ?", [upLink,id]);
  req.flash('success', 'Link Editado Correctamente');
  res.redirect("/links");
});

module.exports = router;
