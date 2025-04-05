import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  useTheme,
  alpha
} from '@mui/material';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: 'center',
          maxWidth: 600,
          width: '100%',
          background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
          borderRadius: 2,
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
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0) 100%)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%, 100% 0)',
            zIndex: 0
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <ErrorIcon 
            sx={{ 
              fontSize: 80, 
              color: 'primary.main',
              mb: 2
            }} 
          />
          
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontSize: { xs: '4rem', sm: '6rem' },
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
              textShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
            }}
          >
            404
          </Typography>

          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Page Not Found
          </Typography>

          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem'
              }}
            >
              Go Home
            </Button>
            <Button
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => navigate('/movies')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.light',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              Browse Movies
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound; 