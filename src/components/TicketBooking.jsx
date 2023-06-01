import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TicketBooking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the form data to local or session storage
    // Here, we'll use local storage as an example
    localStorage.setItem("userDetails", JSON.stringify(formData));
    // Reset the form
    setFormData({ name: "", email: "", phone: "" });
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Ticket Booking</h1>
      <h3>{movie.name}</h3>
      <p>Type: {movie.type}</p>
      <p>Language: {movie.language}</p>
      <p>Genres: {movie.genres.join(", ")}</p>

      <button onClick={() => window.history.back()}>Go Back</button>

      <h2>Book a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Book Ticket</button>
      </form>
    </div>
  );
};

export default TicketBooking;
