// src/pages/Movies.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import MovieCard from "../components/MovieCard";
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Button,
  Paper,
  useTheme,
  alpha,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  useMediaQuery,
  Pagination
} from '@mui/material';
import {
  Movie as MovieIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon,
  LocalFireDepartment as FireIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon
} from '@mui/icons-material';

export default function Movies() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    fetchMovies();
  }, [page]);

    const fetchMovies = async () => {
      try {
      setLoading(true);
      setError("");
        const token = localStorage.getItem("token");
        const res = await API.get("/movies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(res.data);
      setTotalPages(Math.ceil(res.data.length / moviesPerPage));
      setLoading(false);
      } catch (error) {
        console.error(error);
      setError("Failed to load movies. Please try again later.");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (movie.genre && movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))) ||
    (movie.language && movie.language.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginatedMovies = filteredMovies.slice(
    (page - 1) * moviesPerPage,
    page * moviesPerPage
  );

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
          height: { xs: '40vh', md: '50vh' },
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
            backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?cinema,theater)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
            transform: 'scale(1.05)',
            zIndex: 0,
          }
        }}
      >
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
              Movie Collection
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
              Explore our vast collection of movies across different genres, languages, and eras.
            </Typography>
            
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                maxWidth: 600,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <TextField
                fullWidth
                placeholder="Search movies by title, genre, or language..."
                value={searchTerm}
                onChange={handleSearch}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                    '&:hover fieldset': {
                      borderColor: alpha(theme.palette.primary.main, 0.5),
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: theme.palette.text.primary,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                <IconButton 
                  sx={{ 
                    color: alpha(theme.palette.text.primary, 0.7),
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  <FilterListIcon />
                </IconButton>
                <IconButton 
                  sx={{ 
                    color: alpha(theme.palette.text.primary, 0.7),
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  <SortIcon />
                </IconButton>
              </Box>
            </Paper>
            
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 3, 
                mt: 4,
                flexWrap: 'wrap'
              }}
            >
              <Chip
                icon={<FireIcon />}
                label="Popular"
                sx={{
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.light,
                  '& .MuiChip-icon': {
                    color: theme.palette.error.main,
                  }
                }}
              />
              <Chip
                icon={<TrendingUpIcon />}
                label="Trending"
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.light,
                  '& .MuiChip-icon': {
                    color: theme.palette.success.main,
                  }
                }}
              />
              <Chip
                icon={<StarIcon />}
                label="Top Rated"
                sx={{
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.light,
                  '& .MuiChip-icon': {
                    color: theme.palette.warning.main,
                  }
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ pb: 6 }}>
        <Box>
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
                  onClick={fetchMovies}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <MovieIcon sx={{ color: theme.palette.primary.main }} />
                All Movies
              </Typography>
              
              <Typography 
                variant="body2" 
                sx={{ 
                  color: alpha(theme.palette.text.primary, 0.7)
                }}
              >
                Showing {paginatedMovies.length} of {filteredMovies.length} movies
              </Typography>
            </Box>
            
            {paginatedMovies.length > 0 ? (
              <>
                <Grid container spacing={3}>
                  {paginatedMovies.map((movie) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                      <MovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination 
                    count={totalPages} 
                    page={page} 
                    onChange={handlePageChange} 
                    color="primary"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        color: alpha(theme.palette.text.primary, 0.7),
                      },
                      '& .Mui-selected': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                        color: theme.palette.primary.light,
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.3),
                        }
                      }
                    }}
                  />
                </Box>
              </>
            ) : (
              <Box 
                sx={{ 
                  textAlign: 'center',
                  py: 4,
                  color: alpha(theme.palette.text.primary, 0.7)
                }}
              >
                <Typography variant="body1" gutterBottom>
                  No movies found matching your search.
                </Typography>
                <Typography variant="body2">
                  Try adjusting your search terms or filters.
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
