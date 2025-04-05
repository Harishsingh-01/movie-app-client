import React, { useState } from "react";
import axios from "axios";

const MovieRecommendation = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const genres = ["Sci-Fi", "Thriller", "Romance", "Drama", "Action", "Adventure"];

  // Handle genre selection
  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  // Handle user rating input
  const handleRatingChange = (movieId, rating) => {
    setUserRatings({ ...userRatings, [movieId]: rating });
  };

  // Fetch recommendations from Flask API
  const getRecommendations = async () => {
    try {
      const response = await axios.post("http://localhost:5001/recommend", {
        genres: selectedGenres,
        rated_movies: userRatings,
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
  };

  return (
    <div className="container">
      <h1>🎬 AI-Powered Movie Recommendations</h1>

      {/* Genre Selection */}
      <h3>Select Genres:</h3>
      {genres.map((genre) => (
        <label key={genre} style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            checked={selectedGenres.includes(genre)}
            onChange={() => handleGenreChange(genre)}
          />
          {genre}
        </label>
      ))}

      {/* User Ratings */}
      <h3>Rate Movies:</h3>
      {recommendations.length > 0 && (
        <div>
          {recommendations.map((movie) => (
            <div key={movie.id} style={{ marginBottom: "10px" }}>
              <strong>{movie.title}</strong> 
              <input
                type="number"
                min="1"
                max="5"
                value={userRatings[movie.id] || ""}
                onChange={(e) => handleRatingChange(movie.id, parseInt(e.target.value))}
                placeholder="Rate 1-5"
              />
            </div>
          ))}
        </div>
      )}

      {/* Fetch Recommendations */}
      <button onClick={getRecommendations} style={{ marginTop: "10px", padding: "8px 16px" }}>
        Get Recommendations 🎥
      </button>

      {/* Display Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2>🎯 Recommended Movies:</h2>
          <ul>
            {recommendations.map((movie) => (
              <li key={movie.id}>
                <strong>{movie.title}</strong> ({movie.rating}⭐) - {movie.genre.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieRecommendation;
