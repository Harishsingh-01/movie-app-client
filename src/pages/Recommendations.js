import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Button,
  Paper,
  useTheme,
  alpha,
  Fade,
  Zoom,
  IconButton,
  Tooltip,
  Divider,
  useMediaQuery
} from '@mui/material';
import {
  Movie as MovieIcon,
  Star as StarIcon,
  Language as LanguageIcon,
  Category as CategoryIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  LocalFireDepartment as FireIcon,
  TrendingUp as TrendingUpIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';
import api from '../api';

const MovieCard = ({ movie, onMovieClick }) => {
  const theme = useTheme();
  const genre = Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre;
  
  return (
    <Zoom in={true} timeout={800}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          '&:hover': { 
            transform: 'translateY(-8px)',
            boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
            '& .MuiCardMedia-root': {
              transform: 'scale(1.05)',
            },
            '& .movie-overlay': {
              opacity: 1,
            }
          },
          '& .MuiCardMedia-root': {
            transition: 'transform 0.5s ease-in-out',
          }
        }}
        onClick={() => onMovieClick(movie._id)}
      >
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="400"
            image={movie.poster || 'https://via.placeholder.com/300x400?text=No+Poster'}
            alt={movie.title}
          />
          <Box
            className="movie-overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                transform: 'translateY(20px)',
                opacity: 0,
                transition: 'all 0.3s ease-in-out',
                '.movie-card:hover &': {
                  transform: 'translateY(0)',
                  opacity: 1,
                }
              }}
            >
              Click to view details
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ flexGrow: 1, bgcolor: alpha(theme.palette.background.paper, 0.8) }}>
          <Typography 
            variant="h6" 
            component="h2" 
            noWrap
            sx={{ 
              fontWeight: 'bold',
              mb: 1,
              color: theme.palette.text.primary
            }}
          >
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating 
              value={movie.rating || 0} 
              readOnly 
              size="small"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: theme.palette.warning.main,
                }
              }}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                ml: 1,
                color: alpha(theme.palette.text.primary, 0.7)
              }}
            >
              {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
            <Chip
              icon={<LanguageIcon />}
              label={movie.language}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.light,
                '& .MuiChip-icon': {
                  color: theme.palette.primary.main,
                }
              }}
            />
            <Chip
              icon={<CategoryIcon />}
              label={genre}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.light,
                '& .MuiChip-icon': {
                  color: theme.palette.secondary.main,
                }
              }}
            />
          </Box>
          {movie.recommendationReason && (
            <Tooltip title="Why we recommend this movie">
              <Chip 
                icon={<InfoIcon />}
                label={movie.recommendationReason}
                size="small"
                color="primary"
                sx={{ 
                  mt: 1,
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.light,
                  '& .MuiChip-icon': {
                    color: theme.palette.info.main,
                  }
                }}
              />
            </Tooltip>
          )}
        </CardContent>
      </Card>
    </Zoom>
  );
};

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [recResponse, watchedResponse] = await Promise.all([
        api.get('/recommend'),
        api.get('/users/watched-movies')
      ]);
      
      if (recResponse.data && Array.isArray(recResponse.data)) {
        setRecommendations(recResponse.data);
      } else {
        setError('Invalid recommendations data received');
      }
      
      if (watchedResponse.data && Array.isArray(watchedResponse.data)) {
        setWatchedMovies(watchedResponse.data);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError(error.response?.data?.message || 'Failed to load recommendations. Please try again later.');
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handleRetry = () => {
    fetchRecommendations();
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
        }}
      >
        <CircularProgress size={60} sx={{ color: theme.palette.primary.main }} />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '50vh', md: '60vh' },
          overflow: 'hidden',
          mb: 6,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?movie,cinema)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
            transform: 'scale(1.05)',
            zIndex: 0,
          }
        }}
      >
        {/* Background image with low opacity */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("http://i.ibb.co/bjSpBD9P/c7618d222172551-67e28d7322c6e.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
            zIndex: 0
          }}
        />
        
        <Container 
          maxWidth="lg" 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  background: 'linear-gradient(45deg, #fff, #bbb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Your Personalized Movie Journey
              </Typography>
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  color: alpha(theme.palette.text.primary, 0.8),
                  maxWidth: '800px',
                  fontSize: { xs: '1rem', md: '1.25rem' }
                }}
              >
                Discover movies tailored just for you based on your preferences, ratings, and watching history.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AutoAwesomeIcon />}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #ff4081 30%, #2196f3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #f50057 30%, #1976d2 90%)',
                    }
                  }}
                  onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                >
                  Explore Recommendations
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<MovieIcon />}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                    color: theme.palette.primary.light,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                  onClick={() => navigate('/movies')}
                >
                  Browse All Movies
                </Button>
              </Box>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 3, 
                  mt: 6,
                  flexWrap: 'wrap'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FireIcon sx={{ color: theme.palette.error.main, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: alpha(theme.palette.text.primary, 0.8) }}>
                    Personalized picks
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon sx={{ color: theme.palette.success.main, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: alpha(theme.palette.text.primary, 0.8) }}>
                    Trending now
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon sx={{ color: theme.palette.warning.main, fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: alpha(theme.palette.text.primary, 0.8) }}>
                    Top rated
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Fade in={true} timeout={800}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                mb: 4,
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #fff, #bbb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <MovieIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
              Your Recommendations
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 4,
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.light,
                  '& .MuiAlert-icon': {
                    color: theme.palette.error.light
                  }
                }}
                action={
                  <Button 
                    color="inherit" 
                    size="small" 
                    onClick={handleRetry}
                    startIcon={<RefreshIcon />}
                  >
                    Retry
                  </Button>
                }
              >
                {error}
              </Alert>
            )}

            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                mb: 6,
                borderRadius: 3,
                background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #ff4081, #2196f3)'
                }
              }}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  mb: 3,
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <StarIcon sx={{ color: theme.palette.warning.main }} />
                Recommended For You
              </Typography>
              
              {recommendations.length > 0 ? (
                <Grid container spacing={3}>
                  {recommendations.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                      <MovieCard movie={movie} onMovieClick={handleMovieClick} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    py: 4,
                    color: alpha(theme.palette.text.primary, 0.7)
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    No recommendations available yet.
                  </Typography>
                  <Typography variant="body2">
                    Try watching more movies or updating your preferences to get personalized recommendations.
                  </Typography>
                </Box>
              )}
            </Paper>

            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 3,
                background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #4caf50, #2196f3)'
                }
              }}
            >
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  mb: 3,
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <MovieIcon sx={{ color: theme.palette.success.main }} />
                Recently Watched
              </Typography>
              
              {watchedMovies.length > 0 ? (
                <Grid container spacing={3}>
                  {watchedMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                      <MovieCard movie={movie} onMovieClick={handleMovieClick} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    py: 4,
                    color: alpha(theme.palette.text.primary, 0.7)
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    No watched movies yet.
                  </Typography>
                  <Typography variant="body2">
                    Start watching movies to build your history and get better recommendations.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Recommendations; 