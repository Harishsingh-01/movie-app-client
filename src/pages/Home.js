// src/pages/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  IconButton, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid,
  Rating,
  Button,
  Paper,
  Divider,
  Chip,
  useTheme,
  alpha,
  Fade,
  Zoom,
  useMediaQuery
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon,
  PlayArrow as PlayArrowIcon,
  Info as InfoIcon,
  Star as StarIcon,
  Movie as MovieIcon,
  LocalMovies as LocalMoviesIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  Whatshot as WhatshotIcon,
  EmojiEvents as EmojiEventsIcon,
  TrendingUp as TrendingUpIcon,
  NewReleases as NewReleasesIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// Hero section component
const HeroSection = ({ movies }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  
  // Handle automatic rotation
  useEffect(() => {
    // Skip if no movies
    if (!movies || movies.length === 0) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Set up new interval
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      
      // Wait for fade out animation to complete before changing movie
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
        setIsTransitioning(false);
      }, 500); // Half a second for fade out
      
    }, 4000); // Change every 4 seconds
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [movies]);
  
  // Early return if no movies
  if (!movies || movies.length === 0) return null;
  
  const currentMovie = movies[currentIndex];
  
  // Handle manual navigation
  const handlePrevMovie = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
      setIsTransitioning(false);
      
      // Restart the interval
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
          setIsTransitioning(false);
        }, 500);
      }, 4000);
    }, 500);
  };
  
  const handleNextMovie = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      setIsTransitioning(false);
      
      // Restart the interval
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
          setIsTransitioning(false);
        }, 500);
      }, 4000);
    }, 500);
  };
  
  return (
    <Box 
      sx={{ 
        position: 'relative',
        height: '70vh',
        width: '100%',
        overflow: 'hidden',
        mb: 6
      }}
    >
      <Fade in={!isTransitioning} timeout={500}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${currentMovie.poster || 'https://via.placeholder.com/1920x1080?text=Featured+Movie'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            p: 4
          }}
        />
      </Fade>
      
      <Fade in={!isTransitioning} timeout={500}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 4,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
            zIndex: 1
          }}
        >
          <Container maxWidth="lg">
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                mb: 1,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
              }}
            >
              {currentMovie.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating 
                value={currentMovie.rating || 0} 
                readOnly 
                precision={0.5}
                sx={{ mr: 1 }}
              />
              <Typography variant="body1" sx={{ mr: 2 }}>
                {currentMovie.rating ? currentMovie.rating.toFixed(1) : 'N/A'}
              </Typography>
              <Chip 
                label={currentMovie.language} 
                size="small" 
                sx={{ mr: 1 }}
              />
              <Chip 
                label={Array.isArray(currentMovie.genre) 
                  ? currentMovie.genre[0] 
                  : currentMovie.genre} 
                size="small" 
              />
            </Box>
            
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: '60%',
                mb: 3,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {currentMovie.description || 'Experience this amazing movie with stunning visuals and compelling storytelling.'}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={() => navigate(`/movies/${currentMovie._id}`)}
                sx={{ 
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                Watch Now
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<InfoIcon />}
                onClick={() => navigate(`/movies/${currentMovie._id}`)}
                sx={{ 
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { 
                    borderColor: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }
                }}
              >
                More Info
              </Button>
            </Box>
          </Container>
        </Box>
      </Fade>
      
      {/* Navigation arrows */}
      <IconButton 
        sx={{ 
          position: 'absolute', 
          left: 20, 
          top: '50%', 
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.7),
          color: 'white',
          '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.9) }
        }}
        onClick={handlePrevMovie}
      >
        <NavigateBeforeIcon fontSize="large" />
      </IconButton>
      
      <IconButton 
        sx={{ 
          position: 'absolute', 
          right: 20, 
          top: '50%', 
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.7),
          color: 'white',
          '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.9) }
        }}
        onClick={handleNextMovie}
      >
        <NavigateNextIcon fontSize="large" />
      </IconButton>
      
      {/* Indicators */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 20, 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 2
        }}
      >
        {movies.map((_, index) => (
          <Box 
            key={index}
            sx={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%', 
              bgcolor: index === currentIndex ? 'primary.main' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': { bgcolor: index === currentIndex ? 'primary.dark' : 'rgba(255,255,255,0.8)' }
            }}
            onClick={() => {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
              
              setIsTransitioning(true);
              
              setTimeout(() => {
                setCurrentIndex(index);
                setIsTransitioning(false);
                
                // Restart the interval
                intervalRef.current = setInterval(() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
                    setIsTransitioning(false);
                  }, 500);
                }, 4000);
              }, 500);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

// Enhanced MovieRow component with animations and better visuals
const MovieRow = ({ title, movies, onMovieClick, icon }) => {
  const rowRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth 
        : scrollLeft + clientWidth;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(45deg, #fff, #bbb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {icon}
          {title}
        </Typography>
      </Box>
      
      <Box sx={{ position: 'relative' }}>
        <IconButton 
          sx={{ 
            position: 'absolute', 
            left: 0, 
            top: '50%', 
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            color: 'white',
            '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.9) }
          }}
          onClick={() => scroll('left')}
        >
          <ChevronLeftIcon />
        </IconButton>
        
        <Box 
          ref={rowRef}
          sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari, Edge
            gap: 3,
            px: 1,
            py: 1
          }}
        >
          {movies.map((movie, index) => (
            <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }} key={movie._id}>
              <Card 
                sx={{ 
                  minWidth: isMobile ? 200 : 280, 
                  maxWidth: isMobile ? 200 : 280,
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
                  '&:hover': { 
                    transform: 'scale(1.05)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.3)'
                  }
                }}
                onClick={() => onMovieClick(movie._id)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height={isMobile ? 300 : 400}
                    image={movie.poster || 'https://via.placeholder.com/280x400?text=No+Poster'}
                    alt={movie.title}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      p: 1,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Chip 
                      label={movie.language} 
                      size="small" 
                      sx={{ height: 24, fontSize: '0.7rem' }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ color: 'primary.main', fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          ))}
        </Box>
        
        <IconButton 
          sx={{ 
            position: 'absolute', 
            right: 0, 
            top: '50%', 
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: alpha(theme.palette.background.paper, 0.7),
            color: 'white',
            '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.9) }
          }}
          onClick={() => scroll('right')}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

// Featured section with highlighted movies
const FeaturedSection = ({ movies, onMovieClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{ mb: 6 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: 3, 
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(45deg, #fff, #bbb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        <WhatshotIcon sx={{ mr: 1, color: 'error.main' }} />
        Featured Movies
      </Typography>
      
      <Grid container spacing={3}>
        {movies.slice(0, 4).map((movie, index) => (
          <Grid item xs={12} sm={6} md={3} key={movie._id}>
            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
                  '&:hover': { 
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.3)'
                  }
                }}
                onClick={() => onMovieClick(movie._id)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height={isMobile ? 200 : 300}
                    image={movie.poster || 'https://via.placeholder.com/300x400?text=No+Poster'}
                    alt={movie.title}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      p: 1,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Chip 
                      label={movie.language} 
                      size="small" 
                      sx={{ height: 24, fontSize: '0.7rem' }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <StarIcon sx={{ color: 'primary.main', fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <CardContent>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                  </Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Home = () => {
  const [categories, setCategories] = useState({
    hindi: [],
    english: [],
    action: [],
    drama: [],
    comedy: [],
    thriller: []
  });
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/movies');
      const allMovies = response.data;
      
      // Set featured movies (top 5 rated)
      const sortedByRating = [...allMovies].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      setFeaturedMovies(sortedByRating.slice(0, 5));
      
      // Categorize movies
      const categorizedMovies = {
        hindi: allMovies.filter(movie => movie.language === 'Hindi'),
        english: allMovies.filter(movie => movie.language === 'English'),
        action: allMovies.filter(movie => 
          Array.isArray(movie.genre) 
            ? movie.genre.includes('Action') 
            : movie.genre === 'Action'
        ),
        drama: allMovies.filter(movie => 
          Array.isArray(movie.genre) 
            ? movie.genre.includes('Drama') 
            : movie.genre === 'Drama'
        ),
        comedy: allMovies.filter(movie => 
          Array.isArray(movie.genre) 
            ? movie.genre.includes('Comedy') 
            : movie.genre === 'Comedy'
        ),
        thriller: allMovies.filter(movie => 
          Array.isArray(movie.genre) 
            ? movie.genre.includes('Thriller') 
            : movie.genre === 'Thriller'
        )
      };
      
      setCategories(categorizedMovies);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies. Please try again later.');
      setLoading(false);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handleViewAll = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">Loading movies...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Hero Section */}
      <HeroSection movies={featuredMovies} />
      
      <Container maxWidth="lg" sx={{ pb: 8 }}>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        
        {/* Featured Movies Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
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
          <FeaturedSection movies={featuredMovies} onMovieClick={handleMovieClick} />
        </Paper>
        
        {/* Language Categories */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
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
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(45deg, #fff, #bbb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <MovieIcon sx={{ mr: 1, color: 'primary.main' }} />
            Browse by Language
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MovieRow 
                title="Hindi Movies" 
                movies={categories.hindi} 
                onMovieClick={handleMovieClick}
                icon={<LocalMoviesIcon sx={{ mr: 1, color: 'primary.main' }} />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <MovieRow 
                title="English Movies" 
                movies={categories.english} 
                onMovieClick={handleMovieClick}
                icon={<MovieIcon sx={{ mr: 1, color: 'primary.main' }} />}
              />
            </Grid>
          </Grid>
        </Paper>
        
        {/* Genre Categories */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
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
              background: 'linear-gradient(90deg, #ff9800, #f44336)'
            }
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(45deg, #fff, #bbb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <LocalMoviesIcon sx={{ mr: 1, color: 'primary.main' }} />
            Browse by Genre
          </Typography>
          
          <MovieRow 
            title="Action Movies" 
            movies={categories.action} 
            onMovieClick={handleMovieClick}
            icon={<WhatshotIcon sx={{ mr: 1, color: 'error.main' }} />}
          />
          
          <MovieRow 
            title="Drama Movies" 
            movies={categories.drama} 
            onMovieClick={handleMovieClick}
            icon={<EmojiEventsIcon sx={{ mr: 1, color: 'info.main' }} />}
          />
          
          <MovieRow 
            title="Comedy Movies" 
            movies={categories.comedy} 
            onMovieClick={handleMovieClick}
            icon={<StarIcon sx={{ mr: 1, color: 'warning.main' }} />}
          />
          
          <MovieRow 
            title="Thriller Movies" 
            movies={categories.thriller} 
            onMovieClick={handleMovieClick}
            icon={<TrendingUpIcon sx={{ mr: 1, color: 'success.main' }} />}
          />
        </Paper>
        
        {/* New Releases Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
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
              background: 'linear-gradient(90deg, #9c27b0, #2196f3)'
            }
          }}
        >
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(45deg, #fff, #bbb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <NewReleasesIcon sx={{ mr: 1, color: 'primary.main' }} />
            New Releases
          </Typography>
          
          <MovieRow 
            title="Latest Movies" 
            movies={[...featuredMovies].reverse()} 
            onMovieClick={handleMovieClick}
            icon={<NewReleasesIcon sx={{ mr: 1, color: 'primary.main' }} />}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
