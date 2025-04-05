import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import api from '../api';

const MovieTrailer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movies/${id}`);
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setError('Failed to load movie details. Please try again later.');
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

  if (!movie || !movie.trailerUrl) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Trailer not available for this movie</Typography>
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

  // Extract YouTube video ID from the URL
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(movie.trailerUrl);

  return (
    <Container sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4 }}
      >
        Back to Movie Details
      </Button>

      <Paper 
        sx={{ 
          p: 3,
          background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: 'white',
            mb: 3,
            fontWeight: 'bold'
          }}
        >
          {movie.title} - Official Trailer
        </Typography>

        <Box 
          sx={{ 
            position: 'relative',
            paddingTop: '56.25%', // 16:9 Aspect Ratio
            width: '100%',
            mb: 3
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            src={`https://www.youtube.com/embed/${videoId}`}
            title={`${movie.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            color: alpha(theme.palette.text.primary, 0.8),
            mb: 2
          }}
        >
          {movie.description || 'Watch the official trailer for this exciting movie!'}
        </Typography>
      </Paper>
    </Container>
  );
};

export default MovieTrailer; 