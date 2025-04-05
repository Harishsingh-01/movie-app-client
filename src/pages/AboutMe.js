import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Divider, 
  Chip, 
  Link, 
  useTheme,
  alpha,
  Avatar,
  Button,
  Stack,
  useMediaQuery
} from '@mui/material';
import { 
  Code as CodeIcon,
  School as SchoolIcon,
  WebAsset as WebAssetIcon,
  Storage as StorageIcon,
  Api as ApiIcon,
  Movie as MovieIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const AboutMe = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      {/* Hero Section with Full Width Background */}
      <Box 
        sx={{ 
          width: '100%',
        //   background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, sm: 8, md: 10 },
          mb: { xs: 4, sm: 6 }
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
            opacity: 0.15,
            zIndex: 0
          }}
        />
        
        {/* Background pattern */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            opacity: 0.3,
            zIndex: 1
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Avatar 
                sx={{ 
                  width: { xs: 150, sm: 180, md: 200 }, 
                  height: { xs: 150, sm: 180, md: 200 }, 
                  mx: { xs: 'auto', md: 'auto' },
                  mb: { xs: 3, md: 0 },
                  border: '4px solid',
                  borderColor: 'white',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                  background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)'
                }}
              >
                <MovieIcon sx={{ fontSize: { xs: 80, sm: 100, md: 120 }, color: 'white' }} />
              </Avatar>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant={isMobile ? "h3" : "h2"} 
                  component="h1" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'white',
                    mb: 1,
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  Harish Singh
                </Typography>
                
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    mb: 2, 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 500
                  }}
                >
                  Web Developer & Movie Enthusiast
                </Typography>
                
                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ 
                    fontSize: '1.1rem', 
                    lineHeight: 1.7, 
                    mb: 3,
                    color: 'rgba(255, 255, 255, 0.8)',
                    maxWidth: '700px'
                  }}
                >
                  A passionate web developer currently pursuing a BCA at GLA University. With a strong foundation in <strong>MERN stack development</strong> and a keen eye for user experience, I built this platform to help people discover great movies that match their interests.
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  sx={{ mb: 3 }}
                >
                  <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<EmailIcon />}
                    href="mailto:harishchaudhary790@gmail.com"
                    size="large"
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                    }}
                  >
                    Email Me
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="inherit" 
                    startIcon={<MovieIcon />}
                    href="/movies"
                    size="large"
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' }
                    }}
                  >
                    Explore Movies
                  </Button>
                </Stack>
                
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Link 
                    href="https://www.linkedin.com/in/harish--singh/" 
                    target="_blank"
                    sx={{ 
                      color: 'white',
                      '&:hover': { color: 'rgba(255, 255, 255, 0.8)' }
                    }}
                  >
                    <LinkedInIcon sx={{ fontSize: 28 }} />
                  </Link>
                  <Link 
                    href="https://github.com/Harishsingh-01" 
                    target="_blank"
                    sx={{ 
                      color: 'white',
                      '&:hover': { color: 'rgba(255, 255, 255, 0.8)' }
                    }}
                  >
                    <GitHubIcon sx={{ fontSize: 28 }} />
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        {/* About Project Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 2,
            background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              mb: 3
            }}
          >
            <WebAssetIcon sx={{ mr: 2, color: 'primary.main' }} />
            About This Project
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            This movie discovery platform is designed to provide users with personalized movie suggestions based on their interests and viewing history. The system features an intuitive interface and smart filtering options to help users find their next favorite movie.
          </Typography>
        </Paper>

        {/* Technologies Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 2,
            background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              mb: 3
            }}
          >
            <CodeIcon sx={{ mr: 2, color: 'primary.main' }} />
            Technologies Used
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Frontend
                </Typography>
                <Typography variant="body1" paragraph>
                  React.js with dynamic UI for seamless movie browsing and filtering.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="React.js" color="primary" />
                  <Chip label="Material-UI" color="primary" />
                  <Chip label="Redux" color="primary" />
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <ApiIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Backend
                </Typography>
                <Typography variant="body1" paragraph>
                  Node.js & Express.js handling user interactions and API calls.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="Node.js" color="primary" />
                  <Chip label="Express.js" color="primary" />
                  <Chip label="JWT" color="primary" />
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <StorageIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Database
                </Typography>
                <Typography variant="body1" paragraph>
                  MongoDB for storing user preferences and movie data.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="MongoDB" color="primary" />
                  <Chip label="Mongoose" color="primary" />
                </Box>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                  <WebAssetIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Additional Features
                </Typography>
                <Typography variant="body1" paragraph>
                  Advanced search functionality, user reviews, and social sharing capabilities.
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip label="RESTful APIs" color="primary" />
                  <Chip label="Real-time Updates" color="primary" />
                  <Chip label="Social Integration" color="primary" />
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Future Enhancements
            </Typography>
            <Typography variant="body1" paragraph>
              Social networking features, advanced movie filtering, and personalized watchlists.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label="Social Features" color="secondary" />
              <Chip label="Advanced Filters" color="secondary" />
              <Chip label="Custom Watchlists" color="secondary" />
            </Box>
          </Box>
        </Paper>

        {/* Why I Built This Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 2,
            background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              mb: 3
            }}
          >
            <MovieIcon sx={{ mr: 2, color: 'primary.main' }} />
            Why I Built This?
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
            As a movie enthusiast and web developer, I wanted to create a platform that makes it easier for people to discover movies they'll love. This project combines my passion for web development with my love for cinema, creating an engaging user experience for movie fans.
          </Typography>
        </Paper>

        {/* Connect Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              mb: 3
            }}
          >
            <SchoolIcon sx={{ mr: 2, color: 'primary.main' }} />
            Let's Connect!
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 3 }}>
            If you're interested in web development or want to discuss movies, feel free to reach out!
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Link 
                    href="mailto:harishchaudhary790@gmail.com" 
                    color="primary"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    harishchaudhary790@gmail.com
                  </Link>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LinkedInIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    LinkedIn
                  </Typography>
                  <Link 
                    href="https://www.linkedin.com/in/harish--singh/" 
                    color="primary"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    My LinkedIn Profile
                  </Link>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GitHubIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    GitHub
                  </Typography>
                  <Link 
                    href="https://github.com/Harishsingh-01" 
                    color="primary"
                    sx={{ 
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    My GitHub Profile
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              fontStyle: 'italic',
              color: 'primary.light'
            }}
          >
            Enjoy discovering your next favorite movie!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutMe;