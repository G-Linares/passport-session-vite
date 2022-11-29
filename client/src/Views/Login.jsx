import Reat from "react";
import axios from "axios";
import { useForm } from "../Hooks/useForm";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: ""
  };

  const submitHandlerLogin = async (event) => {
    event.preventDefault();
    const { data: response } = await axios.post(
      "http://localhost:4000/login",
      state,
      { withCredentials: true }
    );
    if (response.status === "success") {
      navigate("/home");
    } else {
      alert(response.message);
    }
  };

  const { state, bind } = useForm(initialState);
  const { username, password } = state;
  return (
    <>
      <div>
        <form onSubmit={submitHandlerLogin}>
          <h1>Inicia sesion con tu cuenta</h1>
          <input
            placeholder="username"
            required
            {...bind}
            name="username"
            type="text"
            value={username}
          />
          <input
            placeholder="password"
            required
            {...bind}
            name="password"
            type="text"
            value={password}
          />
          <button type="submit"> Iniciar Sesion</button>
        </form>
      </div>
      <Link to="/register">
        <button> Si no tienes cuenta presiona aca</button>
      </Link>
    </>
  );
}

export default Login;
