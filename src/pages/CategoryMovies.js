import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import api from '../api';

const CategoryMovies = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovies();
  }, [category]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movies/category/${category}`);
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching category movies:', error);
      setError('Failed to load movies. Please try again later.');
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          variant="outlined"
        >
          Back to Home
        </Button>
        <Typography variant="h4" component="h1" sx={{ textTransform: 'capitalize' }}>
          {category} Movies
        </Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {movies.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
          No movies found in this category.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
                onClick={() => handleMovieClick(movie._id)}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={movie.poster || 'https://via.placeholder.com/300x400?text=No+Poster'}
                  alt={movie.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" noWrap>
                    {movie.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={movie.rating || 0} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {movie.language} • {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CategoryMovies; 