import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Rating,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Divider,
  useTheme,
  alpha,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  PlaylistAdd as PlaylistAddIcon,
  PlaylistRemove as PlaylistRemoveIcon,
  PlayArrow as PlayArrowIcon
} from '@mui/icons-material';
import api from '../api';
import { jwtDecode } from 'jwt-decode';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState(0);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchMovieDetails();
    checkWatchlistStatus();
  }, [id]);

  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const checkWatchlistStatus = async () => {
    try {
      const response = await api.get('/users/watchlist');
      const watchlist = response.data;
      setIsInWatchlist(watchlist.some(item => item.movieId._id === id));
    } catch (error) {
      console.error('Error checking watchlist status:', error);
    }
  };

  const handleWatchlistToggle = async () => {
    try {
      if (isInWatchlist) {
        await api.delete(`/users/watchlist/${id}`);
        setSnackbar({
          open: true,
          message: 'Movie removed from watchlist',
          severity: 'success'
        });
      } else {
        await api.post('/users/watchlist', { movieId: id });
        setSnackbar({
          open: true,
          message: 'Movie added to watchlist',
          severity: 'success'
        });
      }
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error updating watchlist',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movies/${id}`);
      setMovie(response.data);
      
      // Find user's previous rating if it exists
      const userId = getUserId();
      if (userId && response.data.ratings) {
        const userRatingObj = response.data.ratings.find(
          rating => rating.userId.toString() === userId.toString()
        );
        if (userRatingObj) {
          setUserRating(userRatingObj.score);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Failed to load movie details. Please try again later.');
      setLoading(false);
    }
  };

  const handleRatingChange = async (event, newValue) => {
    try {
      setLoading(true);
      const response = await api.post(`/movies/${id}/rate`, { rating: newValue });
      setUserRating(newValue);
      setMovie(prevMovie => ({
        ...prevMovie,
        rating: response.data.rating,
        ratings: response.data.ratings
      }));
      setError('');
    } catch (error) {
      console.error('Error rating movie:', error);
      setError(error.response?.data?.message || 'Failed to update rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Movie not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper 
            component="img"
            src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.title}
            sx={{ 
              width: '100%',
              height: 'auto',
              borderRadius: 2
            }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h3" component="h1" gutterBottom>
            {movie.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating 
              value={movie.rating || 0} 
              readOnly 
              precision={0.5}
              sx={{ mr: 1 }}
            />
            <Typography variant="body1" color="text.secondary">
              {movie.rating ? movie.rating.toFixed(1) : 'No ratings yet'}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Rate this movie
            </Typography>
            <Rating
              value={userRating}
              onChange={handleRatingChange}
              precision={0.5}
              size="large"
            />
          </Box>

          <Button
            variant="contained"
            color={isInWatchlist ? "secondary" : "primary"}
            startIcon={isInWatchlist ? <PlaylistRemoveIcon /> : <PlaylistAddIcon />}
            onClick={handleWatchlistToggle}
            sx={{ mb: 3, mr: 2 }}
          >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Button>

          {movie.trailerUrl && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrowIcon />}
              onClick={() => navigate(`/movies/${movie._id}/trailer`)}
              sx={{ 
                mb: 3,
                background: 'linear-gradient(45deg, #FF4081 30%, #FF6B6B 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #FF4081 90%)',
                }
              }}
            >
              Watch Movie
            </Button>
          )}

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Language
              </Typography>
              <Typography variant="body1">
                {movie.language}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="text.secondary">
                Genre
              </Typography>
              <Typography variant="body1">
                {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body1">
              {movie.description || 'No description available.'}
            </Typography>
          </Box>

          {movie.actors && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Cast
              </Typography>
              <Typography variant="body1">
                {Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 60,
                height: 3,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 1.5
              }
            }}
          >
            Similar Movies
          </Typography>
          
          <Grid container spacing={3}>
            {similarMovies.map((similarMovie) => (
              <Grid item xs={12} sm={6} md={3} key={similarMovie._id}>
                <MovieCard movie={similarMovie} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MovieDetails; 