import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  IconButton, 
  Divider,
  useTheme,
  alpha,
  useMediaQuery
} from '@mui/material';
import { 
  Movie as MovieIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Recommend as RecommendIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #1976d2, #64b5f6)'
        }
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '30%',
          height: '100%',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0) 100%)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 0.5, sm: 1 } }}>
              <MovieIcon sx={{ fontSize: { xs: 20, sm: 24 }, color: 'primary.main', mr: 1 }} />
              <Typography
                variant={isMobile ? "subtitle2" : "subtitle1"}
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(45deg, #fff, #bbb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                FilmyYatra
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 0.5, sm: 1 }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
              Your ultimate destination for movie recommendations. Discover new films based on your preferences and enjoy a personalized movie-watching experience.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  p: { xs: 0.25, sm: 0.5 }
                }}
                aria-label="Facebook"
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  p: { xs: 0.25, sm: 0.5 }
                }}
                aria-label="Twitter"
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  p: { xs: 0.25, sm: 0.5 }
                }}
                aria-label="Instagram"
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  p: { xs: 0.25, sm: 0.5 }
                }}
                aria-label="GitHub"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  p: { xs: 0.25, sm: 0.5 }
                }}
                aria-label="LinkedIn"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant={isMobile ? "subtitle2" : "subtitle1"} color="white" gutterBottom sx={{ mb: { xs: 0.5, sm: 1 } }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.25, sm: 0.5 } }}>
              <Link 
                to="/" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <HomeIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Home
                </Typography>
              </Link>
              <Link 
                to="/movies" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <SearchIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Browse Movies
                </Typography>
              </Link>
              <Link 
                to="/about" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <InfoIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  About Me
                </Typography>
              </Link>
              <Link 
                to="/recommendations" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <RecommendIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Recommendations
                </Typography>
              </Link>
              <Link 
                to="/profile" 
                style={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <PersonIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Profile
                </Typography>
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={6} sm={6} md={4}>
            <Typography variant={isMobile ? "subtitle2" : "subtitle1"} color="white" gutterBottom sx={{ mb: { xs: 0.5, sm: 1 } }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.25, sm: 0.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ fontSize: { xs: 12, sm: 14 }, mr: 0.5, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  harishtaliyan@gmail.com
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 0.5, sm: 1 }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                Have questions or feedback? We'd love to hear from you!
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 1.5, sm: 2, md: 3 }, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'center', sm: 'center' }, 
          gap: { xs: 0.5, sm: 0 }
        }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}>
            © {currentYear} FilmyYatra. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' }
          }}>
            <span>Created with ❤️ by</span>
            <Typography 
              variant="body2" 
              component="span" 
              sx={{ 
                ml: 0.5, 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #fff, #bbb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Harish Singh
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 