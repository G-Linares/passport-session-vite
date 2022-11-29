import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import session from "express-session";
import bodyParser from "body-parser";
import { config } from "dotenv";
import { User } from "./Models/User.js";
import passportConfig from "./Utils/passportConfig.js";

const app = express();
config(); // <--- para que la app pueda leer variables de entorno
const PORT = process.env.PORT || 4000;

// Mongo Connection ----------
mongoose.connect(
  process.env.CONNECTION_MONGODB_URL, // <---- tu URL de mongo con esos options
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log("Mongo conectado")
);

// MiddleWare -----------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `${process.env.CONNECTION_FRONT_END_PORT}`, // <---- aqui ponel el URL del front, no puedes dejar el *
    credentials: true // <--- importante para que permita pasar cookies
  })
);
app.use(
  session({
    secret: `${process.env.CONNECTION_SESSION_SECRET}`,
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser(`${process.env.CONNECTION_SESSION_SECRET}`)); // <--- cookie parser tiene que tener mismo secret que session
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport); // <--- mando config de mi passport config en utils

// Rutas de App -------- Decidi dejar las rutas en base ya que es tan basica la app que no neceista router
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res
        .status(200)
        .json({ status: "error", message: "Usuario o contraseña incorrectos" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).json({ status: "success", message: "Accediste" });
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc)
      res
        .status(200)
        .json({ status: "error", message: "Ya existe un usuario" });
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // <--- se puede usar el genSaltSync(10) pero lo deje hardcodeado
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      });
      await newUser.save();
      res
        .status(200)
        .json({ status: "success", message: "Create un nuevo usuario" });
    }
  });
});

app.get("/user", (req, res) => {
  if (req.user) {
    res.json({ status: "success", data: req.user }); // <--- en req.user esta almacenada toda la info que passport haya mandado
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Algo salio mal al traer usuario" });
  }
});

/// Inicio mi App --------
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
