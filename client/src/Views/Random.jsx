import React, { useState } from "react";
import axios from "axios";

const Random = () => {
  const [numbers, setNumbers] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCalculate = async (e) => {
    // <--- hace fetch al back con el numero que viene en input
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data: response } = await axios.get(
        `http://localhost:8080/api/randoms?cant=${numbers}`
      );
      setData(response); //<---- se mapea para imprimir
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };
  return (
    <div>
      {" "}
      <h1> Calcular Random</h1>
      <h4>
        {" "}
        Si mandas vacio el unput se manda el request como default, sin el ?cant=
      </h4>
      <form onSubmit={handleCalculate}>
        <input
          value={undefined}
          type="number"
          onChange={(e) => setNumbers(e.target.value)}
        />
        <button type="submit"> Calcular</button>
        {data.length < 1 ? null : (
          <div>
            {isLoading ? (
              <> ... Loading ....</>
            ) : (
              <>
                {data.map((number) => {
                  return (
                    <div key={Object.keys(number)[0]}>
                      {" "}
                      #{Object.keys(number)[0]} aparece{" "}
                      {Object.values(number)[0]} veces
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default Random;
