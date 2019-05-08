const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");

//inicializaciones
const app = express();

//Configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs",exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Variables Globales
app.use((req, res, next) => {
  next();
});

//Rutas
app.use(require("./routers/index.router"));
app.use(require("./routers/authenticatio.router"));
app.use('/links',require("./routers/links.router"));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Inicio del Servidor
app.listen(app.get("port"), () => {
  console.log("Servidor Corriendo en Puerto:", app.get("port"));
});
