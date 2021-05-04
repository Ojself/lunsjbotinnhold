import axios from "axios";
import React, { useState, useEffect } from "react";

const EXTERNAL_API = "https://lunsjbotki.herokuapp.com/menu/";
const githubUrl = "https://github.com/Ojself/lunsjbot";

console.log(githubUrl);

const Menu = ({ menu }) => {
  return (
    <div>
      {menu.map((d) => {
        return (
          <div style={{ marginTop: "10vh" }} key={d.name}>
            <h2>{d.name}</h2>
            <h4>Allergener</h4>
            {d.allergens.length ? (
              d.allergens.map((n) => {
                return <li key={n.name}>{n.name}</li>;
              })
            ) : (
              <em> Intet oppgitt</em>
            )}
            <h4>Næringsinnhold</h4>
            {d.nutrients.map((n) => {
              return (
                <li key={n.name}>
                  {n.name} - {n.value} {n.code}
                </li>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenu = async () => {
      let result;
      try {
        result = await axios.get(EXTERNAL_API);
        setLoading(false);
      } catch (err) {
        console.warn(err);
        return;
      }
      setMenu(result.data.todaysMenu);
    };
    fetchMenu();
  }, []);
  return (
    <div>
      <header>
        <h1>LUNSJBOT</h1>
        <p>
          Lunsjbot er <a href={githubUrl}>open source</a>
        </p>
      </header>
      {loading ? (
        <p> Loading ... </p>
      ) : (!menu || menu.length) === 0 ? (
        <p>Something went wrong..</p>
      ) : (
        <Menu menu={menu} />
      )}
    </div>
  );
};

export default App;
