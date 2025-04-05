// src/pages/MovieDetail.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";


export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/movies/details/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovie();
  }, [id]);

  const handleRating = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      await API.post(
        `/rate/${id}/rate`,
        {
            userId,
            score: Number(rating),
          },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Rating submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error submitting rating");
    }
  };

  if (!movie) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-xl">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      {movie.poster && (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full max-h-[400px] object-cover rounded mb-4"
        />
      )}

      <p className="text-gray-600 mb-2">
        <strong>Genre:</strong> {movie.genre.join(", ")}
      </p>

      <p className="text-gray-600 mb-2">
        <strong>Actors:</strong> {movie.actors.join(", ")}
      </p>

      <p className="text-gray-600 mb-2">
        <strong>Language:</strong> {movie.language}
      </p>

      <p className="text-yellow-600 mb-4 font-semibold">
        ⭐ Average Rating: {movie.rating.toFixed(1)} / 5
      </p>

      <div className="mt-6">
        <label className="block mb-2 font-medium">Rate this movie (1 to 5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded w-20 mr-2"
        />
        <button
          onClick={handleRating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        {message && <p className="mt-2 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
