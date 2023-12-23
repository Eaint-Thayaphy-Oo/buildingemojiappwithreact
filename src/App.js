import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://emoji-api.com/emojis?access_key=54d589fa45938a54f9dd697eca7130cb9f92b8eb"
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  });

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleSubmit = () => {
    if (search !== "") {
      fetch(
        `https://emoji-api.com/emojis?search=${search}&access_key=54d589fa45938a54f9dd697eca7130cb9f92b8eb`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setData(res);
          } else {
            setData([]);
          }
        });
    }
  };

  return (
    <div className="App">
      <div className="menu">
        <div className="menu-text">
          <h1>Emoji Search</h1>
          <p>A simple Emoji search with React</p>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <button onClick={() => handleSubmit()} className="search">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {data.map((e, i) => (
          <div className="card" key={e.slug}>
            <p className="emo">{e.character}</p>
            <p className="name">{e.unicodeName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
