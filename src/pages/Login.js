// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Alert, 
  Paper, 
  InputAdornment, 
  IconButton, 
  Divider,
  useTheme,
  alpha,
  Fade
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon, 
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import PreferencesForm from '../components/PreferencesForm';
import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      // Store token and user data
      login(token, user);
      
      // Check if user has set preferences
      try {
        const userResponse = await api.get('/users/preferences');
        if (!userResponse.data.hasSetPreferences) {
          setShowPreferences(true);
        } else {
          navigate('/');
        }
      } catch (prefError) {
        console.error('Error fetching preferences:', prefError);
        // If there's an error fetching preferences, still navigate to home
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferencesSubmit = async (preferences) => {
    try {
      await api.post('/users/preferences', preferences);
      navigate('/');
    } catch (error) {
      console.error('Error saving preferences:', error);
      setError('Failed to save preferences. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
        py: 4
      }}
    >
      <Container component="main" maxWidth="xs">
        <Fade in={true} timeout={800}>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography 
                component="h1" 
                variant="h4" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #fff, #bbb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Welcome Back
              </Typography>
              
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    width: '100%', 
                    mb: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    color: theme.palette.error.light,
                    '& .MuiAlert-icon': {
                      color: theme.palette.error.light
                    }
                  }}
                >
                  {error}
                </Alert>
              )}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
          name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      '& fieldset': {
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                      },
                      '&:hover fieldset': {
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: alpha(theme.palette.text.primary, 0.7),
                    },
                    '& .MuiInputBase-input': {
                      color: theme.palette.text.primary,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
          required
                  fullWidth
          name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.paper, 0.5),
                      '& fieldset': {
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                      },
                      '&:hover fieldset': {
                        borderColor: alpha(theme.palette.primary.main, 0.5),
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: alpha(theme.palette.text.primary, 0.7),
                    },
                    '& .MuiInputBase-input': {
                      color: theme.palette.text.primary,
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? 
                            <VisibilityOffIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} /> : 
                            <VisibilityIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
          type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? null : <LoginIcon />}
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1976d2 30%, #21cbf3 90%)',
                    }
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
                
                <Divider sx={{ my: 2, borderColor: alpha(theme.palette.divider, 0.1) }}>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.5) }}>
                    OR
                  </Typography>
                </Divider>
                
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate('/signup')}
                  startIcon={<PersonAddIcon />}
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.primary.main, 0.5),
                    color: theme.palette.primary.light,
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                    }
                  }}
                >
                  Create New Account
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>

      <PreferencesForm
        open={showPreferences}
        onClose={() => setShowPreferences(false)}
        onSubmit={handlePreferencesSubmit}
      />
    </Box>
  );
};

export default Login;
