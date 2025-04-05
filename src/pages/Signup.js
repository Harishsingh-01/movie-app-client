// src/pages/Signup.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
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
  Fade,
  CircularProgress
} from '@mui/material';
import { 
  Email as EmailIcon, 
  Lock as LockIcon, 
  Visibility as VisibilityIcon, 
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

export default function Signup() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const response = await api.post("/auth/signup", form);
      setAccountCreated(new Date());
      setSuccess(true);
      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (success) {
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
                  background: 'linear-gradient(90deg, #4caf50, #2196f3)'
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
                <Alert 
                  severity="success" 
                  sx={{ 
                    width: '100%', 
                    mb: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.light,
                    '& .MuiAlert-icon': {
                      color: theme.palette.success.light
                    }
                  }}
                >
                  Account Created Successfully! 🎉
                </Alert>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 'bold',
                    color: theme.palette.text.primary
                  }}
                >
                  Welcome to our community, {form.name}!
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: alpha(theme.palette.text.primary, 0.7),
                    mb: 1
                  }}
                >
            Account created on: {accountCreated.toLocaleString()}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: alpha(theme.palette.text.primary, 0.7),
                    mb: 3
                  }}
                >
                  Redirecting to login page...
                </Typography>
                <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
              </Box>
            </Paper>
          </Fade>
        </Container>
      </Box>
    );
  }

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
                background: 'linear-gradient(90deg, #4caf50, #2196f3)'
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
                Create Account
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
                  id="name"
                  label="Name"
          name="name"
                  autoComplete="name"
                  autoFocus
                  value={form.name}
          onChange={handleChange}
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
                        <PersonIcon sx={{ color: alpha(theme.palette.primary.main, 0.7) }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
          required
                  fullWidth
                  id="email"
                  label="Email Address"
          name="email"
                  autoComplete="email"
                  value={form.email}
          onChange={handleChange}
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
                  autoComplete="new-password"
                  value={form.password}
          onChange={handleChange}
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
                  startIcon={loading ? null : <PersonAddIcon />}
                  sx={{ 
                    mt: 3, 
                    mb: 2,
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #4caf50 30%, #8bc34a 90%)',
                    boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #388e3c 30%, #8bc34a 90%)',
                    }
                  }}
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </Button>
                
                <Divider sx={{ my: 2, borderColor: alpha(theme.palette.divider, 0.1) }}>
                  <Typography variant="body2" sx={{ color: alpha(theme.palette.text.primary, 0.5) }}>
                    OR
                  </Typography>
                </Divider>
                
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  startIcon={<ArrowBackIcon />}
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
                  Back to Login
                </Button>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
