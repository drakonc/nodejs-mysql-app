const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySqlStore =  require('express-mysql-session');
const { database } = require('./keys');
const passport = require('passport');

//inicializaciones
const app = express();
require('./lib/passport');

//Configuraciones
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
  })
);
app.set("view engine", ".hbs");

//Middlewares
app.use(session({
  secret: 'nodemysqlsession',
  resave: false,
  saveUninitialized: false,
  store: new MySqlStore(database)
}));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  next();
});

//Rutas
app.use(require("./routers/index.router"));
app.use(require("./routers/authenticatio.router"));
app.use("/links", require("./routers/links.router"));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Inicio del Servidor
app.listen(app.get("port"), () => {
  console.log("Servidor Corriendo en Puerto:", app.get("port"));
});
