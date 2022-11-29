import Reat from "react";
import axios from "axios";
import { useForm } from "../Hooks/useForm";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const initialState = {
    username: "",
    password: ""
  };

  const submitHandlerRegister = async (event) => {
    event.preventDefault();
    const { data: response } = await axios.post(
      "http://localhost:4000/register",
      state,
      { withCredentials: true }
    );
    if (response.status === "success") {
      navigate("/");
    } else {
      alert(response.message);
    }
  };

  const { state, bind } = useForm(initialState);
  const { username, password } = state;
  return (
    <>
      <div>
        <form onSubmit={submitHandlerRegister}>
          <h1>Register!</h1>
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
          <button type="submit"> Register</button>
        </form>
      </div>
      <Link to="/">
        <button>Si ya tienes cuenta presiona aqui</button>
      </Link>
    </>
  );
}

export default Register;
