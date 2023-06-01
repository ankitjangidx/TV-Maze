import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const App = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>TV Maze</h1>
      {shows.map((show) => (
        <div key={show.show.id}>
          <h3>{show.show?.name}</h3>
          <img src={show.show?.image?.medium} alt={show.show?.name} />
          <p>Type: {show.show?.type}</p>
          <p>Language: {show.show?.language}</p>
          <p>Genres: {show.show?.genres?.join(", ")}</p>
          <Link to={`summary/${show.show?.id}`}>View Summary</Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
