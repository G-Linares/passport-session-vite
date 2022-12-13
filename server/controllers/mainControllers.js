import { User } from "../Models/User.js";
import passport from "passport";
import bcrypt from "bcrypt";

export const register = (req, res) => {
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
};

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user)
      res
        .status(200)
        .json({ status: "error", message: "Usuario o contraseña incorrectos" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log("accediste");
        res.status(200).json({ status: "success", message: "Accediste" });
      });
    }
  })(req, res, next);
};

export const user = (req, res) => {
  if (req.user) {
    res.json({ status: "success", data: req.user }); // <--- en req.user esta almacenada toda la info que passport haya mandado
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Algo salio mal al traer usuario" });
  }
};
