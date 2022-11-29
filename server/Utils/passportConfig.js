import bcrypt from "bcryptjs";
import { Strategy as localStrategy } from "passport-local";
// importo mi modelo de Mongo de usuario
import { User } from "../Models/User.js";

export default function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        // busca un usuario, si encuentra error, lo muestra, si no hay usuario manda false, si existe usuario compara password y si da true regresa el user
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username // <--- Puedes limitar la informacion que se manda creando un nuevo objeto
      };
      cb(err, userInformation);
    });
  });
}
