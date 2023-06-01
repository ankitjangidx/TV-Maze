import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Summary = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShow(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
      {show ? (
        <>
          <h1>{show?.name}</h1>
          <img src={show?.image?.medium} alt={show.name} />
          <p>{show?.summary}</p>
          <button>
            <Link to={`/booking/${show.id}`}>Book Ticket</Link>
          </button>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Summary;
