import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await axios.get(
          "http://localhost:8080/user", // <-- Ruta que apunta al back que trae informacion del User
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        setData(response);
        console.log(response);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(data);

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <div>
      {" "}
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <h1> Bienvenido {data.data.username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default Home;
