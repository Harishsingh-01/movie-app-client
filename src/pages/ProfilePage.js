import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { 
  Alert, 
  CircularProgress, 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Divider,
  Avatar,
  Chip,
  Button,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Tabs,
  Tab,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  useMediaQuery
} from "@mui/material";
import { 
  Person as PersonIcon, 
  Movie as MovieIcon, 
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  Star as StarIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  PlaylistAdd as PlaylistAddIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// Available genres and languages
const AVAILABLE_GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 
  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 
  'Thriller', 'War', 'Western'
];

const AVAILABLE_LANGUAGES = [
  'English', 'Hindi', 'Spanish', 'French', 'German', 
  'Italian', 'Japanese', 'Korean', 'Chinese', 'Russian'
];

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [preferencesLoading, setPreferencesLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [preferencesError, setPreferencesError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [preferences, setPreferences] = useState({
    genres: [],
    languages: []
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const [profileResponse, watchlistResponse] = await Promise.all([
          API.get("/users/profile"),
          API.get("/users/watchlist")
        ]);
        
        if (profileResponse.data) {
          setUser(profileResponse.data);
          setRatedMovies(profileResponse.data.ratedMovies || []);
          setFormData(prev => ({
            ...prev,
            name: profileResponse.data.name,
            email: profileResponse.data.email
          }));
          setPreferences({
            genres: profileResponse.data.preferences?.genres || [],
            languages: profileResponse.data.preferences?.languages || []
          });
        }
        
        if (watchlistResponse.data) {
          setWatchlist(watchlistResponse.data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to load profile. Please try again.");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditOpen = () => {
    setEditOpen(true);
    setEditError("");
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditError("");
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const handlePreferencesOpen = () => {
    setPreferencesOpen(true);
    setPreferencesError("");
  };

  const handlePreferencesClose = () => {
    setPreferencesOpen(false);
    setPreferencesError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenreChange = (genre) => {
    setPreferences(prev => {
      const genres = prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres };
    });
  };

  const handleLanguageChange = (language) => {
    setPreferences(prev => {
      const languages = prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language];
      return { ...prev, languages };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");

    try {
      // Validate passwords if trying to change password
      if (formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("New passwords do not match");
        }
        if (!formData.currentPassword) {
          throw new Error("Current password is required to change password");
        }
      }

      const updateData = {
        name: formData.name
      };

      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await API.put("/users/update", updateData);
      
      if (response.data) {
        setUser(response.data);
        handleEditClose();
        if (formData.newPassword) {
          setSuccessMessage("Password updated successfully!");
        } else {
          setSuccessMessage("Profile updated successfully!");
        }
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setEditError(err.response?.data?.message || err.message || "Failed to update profile");
    } finally {
      setEditLoading(false);
    }
  };

  const handlePreferencesSubmit = async () => {
    setPreferencesLoading(true);
    setPreferencesError("");

    try {
      const response = await API.put("/users/preferences", preferences);
      
      if (response.data) {
        setUser(prev => ({
          ...prev,
          preferences: response.data.preferences
        }));
        handlePreferencesClose();
        setSuccessMessage("Preferences updated successfully!");
      }
    } catch (err) {
      console.error("Error updating preferences:", err);
      setPreferencesError(err.response?.data?.message || err.message || "Failed to update preferences");
    } finally {
      setPreferencesLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            mb: 2,
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: 28 }
          }}
        >
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          startIcon={<EditIcon />}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert 
          severity="warning"
          sx={{ 
            borderRadius: 2,
            '& .MuiAlert-icon': { fontSize: 28 }
          }}
        >
          Unable to load profile. Please try logging in again.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 2, sm: 3, md: 4 } }}>
      <Container maxWidth="lg">
        {/* Profile Header */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 }, 
            mb: { xs: 2, sm: 3, md: 4 }, 
            borderRadius: 2,
            background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background pattern */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              right: 0,
              width: { xs: '60%', sm: '50%', md: '40%' },
              height: '100%',
              background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0) 100%)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)',
              zIndex: 0
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'center', sm: 'flex-start' },
              mb: 3 
            }}>
              <Avatar 
                sx={{ 
                  width: { xs: 80, sm: 100, md: 120 }, 
                  height: { xs: 80, sm: 100, md: 120 }, 
                  bgcolor: 'primary.main',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  mb: { xs: 2, sm: 0 },
                  mr: { xs: 0, sm: 3 }
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  component="h1" 
                  fontWeight="bold" 
                  sx={{ mb: 1 }}
                >
                  {user.name}
                </Typography>
                <Chip 
                  icon={<EmailIcon />} 
                  label={user.email} 
                  size={isMobile ? "small" : "medium"}
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.light',
                    '& .MuiChip-icon': { color: 'primary.main' }
                  }}
                />
              </Box>
            </Box>
            
            <Divider sx={{ mb: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 3 },
                  mb: { xs: 2, sm: 0 }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                    <CalendarIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Member Since
                      </Typography>
                      <Typography variant="body1">
                        {new Date(user.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                    <MovieIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Movies Rated
                      </Typography>
                      <Typography variant="body1">
                        {ratedMovies.length}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PlaylistAddIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Watchlist Items
                      </Typography>
                      <Typography variant="body1">
                        {watchlist.length}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ 
                display: 'flex', 
                justifyContent: { xs: 'center', sm: 'flex-end' },
                mt: { xs: 2, sm: 0 }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  width: { xs: '100%', sm: 'auto' }
                }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<EditIcon />}
                    onClick={handleEditOpen}
                    fullWidth={isMobile}
                    sx={{ 
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': { 
                        borderColor: 'primary.light',
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<SettingsIcon />}
                    onClick={handlePreferencesOpen}
                    fullWidth={isMobile}
                    sx={{ 
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': { 
                        borderColor: 'primary.light',
                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                      }
                    }}
                  >
                    Preferences
                  </Button>
                  <Button 
                    variant="contained" 
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    fullWidth={isMobile}
                  >
                    Logout
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Content Tabs */}
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mb: { xs: 2, sm: 3 },
          overflowX: 'auto'
        }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
          >
            <Tab label="Watchlist" />
            <Tab label="Rated Movies" />
          </Tabs>
        </Box>

        {/* Watchlist Section */}
        {activeTab === 0 && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              borderRadius: 2,
              background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: { xs: 2, sm: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <PlaylistAddIcon sx={{ 
                fontSize: { xs: 28, sm: 32 }, 
                mr: { xs: 0, sm: 2 },
                mb: { xs: 1, sm: 0 }
              }} />
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                component="h2" 
                fontWeight="bold"
              >
                My Watchlist
              </Typography>
            </Box>
            
            <Divider sx={{ mb: { xs: 2, sm: 3 }, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            
            {watchlist.length > 0 ? (
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                {watchlist.map((item) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item?.movieId?._id || Math.random()}>
                    {item?.movieId && <MovieCard movie={item.movieId} />}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: { xs: 4, sm: 6 },
                  px: { xs: 1, sm: 2 },
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  borderRadius: 2
                }}
              >
                <PlaylistAddIcon sx={{ 
                  fontSize: { xs: 40, sm: 48 }, 
                  color: 'text.secondary', 
                  mb: 2, 
                  opacity: 0.5 
                }} />
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  color="text.secondary" 
                  gutterBottom
                >
                  Your watchlist is empty
                </Typography>
                <Typography 
                  variant={isMobile ? "body2" : "body1"} 
                  color="text.secondary" 
                  sx={{ mb: 3 }}
                >
                  Add movies to your watchlist to keep track of what you want to watch
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/movies')}
                  startIcon={<MovieIcon />}
                  size={isMobile ? "small" : "medium"}
                >
                  Browse Movies
                </Button>
              </Box>
            )}
          </Paper>
        )}

        {/* Rated Movies Section */}
        {activeTab === 1 && (
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              borderRadius: 2,
              background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: { xs: 2, sm: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <StarIcon sx={{ 
                fontSize: { xs: 28, sm: 32 }, 
                mr: { xs: 0, sm: 2 },
                mb: { xs: 1, sm: 0 }
              }} />
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                component="h2" 
                fontWeight="bold"
              >
                Your Rated Movies
              </Typography>
            </Box>
            
            <Divider sx={{ mb: { xs: 2, sm: 3 }, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            
            {ratedMovies.length > 0 ? (
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                {ratedMovies.map((movie) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={movie?._id || Math.random()}>
                    {movie && <MovieCard movie={movie} />}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: { xs: 4, sm: 6 },
                  px: { xs: 1, sm: 2 },
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  borderRadius: 2
                }}
              >
                <MovieIcon sx={{ 
                  fontSize: { xs: 40, sm: 48 }, 
                  color: 'text.secondary', 
                  mb: 2, 
                  opacity: 0.5 
                }} />
                <Typography 
                  variant={isMobile ? "subtitle1" : "h6"} 
                  color="text.secondary" 
                  gutterBottom
                >
                  No rated movies yet
                </Typography>
                <Typography 
                  variant={isMobile ? "body2" : "body1"} 
                  color="text.secondary" 
                  sx={{ mb: 3 }}
                >
                  Start rating movies to see them appear here
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/movies')}
                  startIcon={<MovieIcon />}
                  size={isMobile ? "small" : "medium"}
                >
                  Browse Movies
                </Button>
              </Box>
            )}
          </Paper>
        )}

        {/* Success Snackbar */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="success" 
            variant="filled"
            sx={{ 
              width: '100%',
              bgcolor: 'success.main',
              '& .MuiAlert-icon': {
                color: 'white'
              }
            }}
          >
            {successMessage}
          </Alert>
        </Snackbar>

        {/* Edit Profile Dialog */}
        <Dialog 
          open={editOpen} 
          onClose={handleEditClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: 'background.paper',
              backgroundImage: 'none',
              m: { xs: 2, sm: 3 }
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 1
          }}>
            <Typography variant={isMobile ? "h6" : "h5"} component="div">
              Edit Profile
            </Typography>
            <IconButton onClick={handleEditClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <form onSubmit={handleSubmit}>
            <DialogContent>
              {editError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {editError}
                </Alert>
              )}
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    size={isMobile ? "small" : "medium"}
                    sx={{
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'rgba(255, 255, 255, 0.7)',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Change Password (Optional)
                    </Typography>
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button 
                onClick={handleEditClose}
                size={isMobile ? "small" : "medium"}
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.text.secondary, 0.1)
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                disabled={editLoading}
                size={isMobile ? "small" : "medium"}
                startIcon={editLoading ? <CircularProgress size={20} /> : null}
              >
                {editLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Preferences Dialog */}
        <Dialog 
          open={preferencesOpen} 
          onClose={handlePreferencesClose}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: 'background.paper',
              backgroundImage: 'none',
              m: { xs: 2, sm: 3 }
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pb: 1
          }}>
            <Typography variant={isMobile ? "h6" : "h5"} component="div">
              Recommendation Preferences
            </Typography>
            <IconButton onClick={handlePreferencesClose} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          
          <DialogContent>
            {preferencesError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {preferencesError}
              </Alert>
            )}
            
            <Typography variant={isMobile ? "subtitle2" : "subtitle1"} gutterBottom sx={{ mt: 2 }}>
              Select your preferred genres for movie recommendations
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              <Grid container spacing={1}>
                {AVAILABLE_GENRES.map((genre) => (
                  <Grid item key={genre}>
                    <Chip
                      label={genre}
                      onClick={() => handleGenreChange(genre)}
                      color={preferences.genres.includes(genre) ? "primary" : "default"}
                      size={isMobile ? "small" : "medium"}
                      sx={{ m: 0.5 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            
            <Typography variant={isMobile ? "subtitle2" : "subtitle1"} gutterBottom>
              Select your preferred languages for movie recommendations
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Grid container spacing={1}>
                {AVAILABLE_LANGUAGES.map((language) => (
                  <Grid item key={language}>
                    <Chip
                      label={language}
                      onClick={() => handleLanguageChange(language)}
                      color={preferences.languages.includes(language) ? "primary" : "default"}
                      size={isMobile ? "small" : "medium"}
                      sx={{ m: 0.5 }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={handlePreferencesClose}
              size={isMobile ? "small" : "medium"}
              sx={{ 
                color: 'text.secondary',
                '&:hover': {
                  bgcolor: alpha(theme.palette.text.secondary, 0.1)
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePreferencesSubmit}
              variant="contained"
              disabled={preferencesLoading}
              size={isMobile ? "small" : "medium"}
              startIcon={preferencesLoading ? <CircularProgress size={20} /> : null}
            >
              {preferencesLoading ? 'Saving...' : 'Save Preferences'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
