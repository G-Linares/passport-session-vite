import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import { config } from "dotenv";
import passportConfig from "./Utils/passportConfig.js";
import yargs from "yargs";
import { fork } from "child_process";
import mainRouter from "./Routes/mainRoutes.js";

const app = express();
config(); // <--- para que la app pueda leer variables de entorno
let PORT = process.env.PORT || 8080;

const argv = yargs(process.argv.slice(2)).argv;
if (argv.p) PORT = argv.p;

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
    origin: process.env.CONNECTION_FRONT_END_PORT, // <---- aqui ponel el URL del front, no puedes dejar el *
    credentials: true, // <---- importante para poder leer cookies
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"]
  })
);
app.use(
  session({
    secret: process.env.CONNECTION_SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser(process.env.CONNECTION_SESSION_SECRET)); // <--- cookie parser tiene que tener mismo secret que session
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport); // <--- mando config de mi passport config en utils

// Rutas de App -------- Decidi dejar las rutas en base ya que es tan basica la app que no neceista router

app.use("/api", mainRouter);

app.get("/info", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      arguments: argv,
      process: process.pid,
      version: process.version,
      system: process.platform,
      location: process.cwd(),
      memory: process.memoryUsage(),
      title: process.title
    }
  });
});

app.get("/api/randoms", (req, res) => {
  const child = fork("./Utils/childCalculate.js"); // < --- creamos proceso hijo
  const { cant } = req.query; // <--- obtenemos query de URL
  let numberToCalculate = parseInt(cant) || 100000; // <--- verificamos si se hace default o tiene un valor
  child.send(numberToCalculate); // <--- manda a child el numero a calcular
  child.on("message", (message) => {
    res.status(200).json(message); // <---- manda el resultado a front
  });
  child.on("error", (error) => {
    res.status(500).json({ message: "Algo salio mal", error }); // <--- imprime error
  });
  child.on("exit", (code) => {
    console.log("child exited with a code of ", code); // <--- termina proceso
  });
});

/// Inicio mi App --------
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
