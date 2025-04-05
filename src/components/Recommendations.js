import React, { useState, useEffect } from "react";
import axios from "axios";

const Recommendations = ({ userId }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recommend/${userId}`);
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error.message);
      }
    };

    fetchRecommendations();
  }, [userId]);

  const handleRating = async (movieId, score) => {
    try {
      await axios.post(`http://localhost:5000/api/rate/${movieId}/rate`, { userId, score });
      alert("Rating submitted!");
    } catch (error) {
      console.error("Error submitting rating:", error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">🎬 Recommended Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
            <p className="text-gray-400">⭐ {movie.rating.toFixed(1)}</p>
            
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(movie.id, star)}
                  className="bg-yellow-400 text-black px-2 py-1 rounded-md"
                >
                  {star} ⭐
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
