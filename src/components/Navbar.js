import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar, 
  Tooltip,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Movie as MovieIcon, 
  Home as HomeIcon, 
  Recommend as RecommendIcon, 
  Person as PersonIcon, 
  Logout as LogoutIcon, 
  Login as LoginIcon, 
  HowToReg as SignUpIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleCloseMenu();
  };
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navButtonStyle = (path) => ({
    color: 'white',
    mx: 1,
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: theme.palette.primary.main,
      transform: isActive(path) ? 'scaleX(1)' : 'scaleX(0)',
      transition: 'transform 0.3s ease',
    },
    '&:hover::after': {
      transform: 'scaleX(1)',
    },
    fontWeight: isActive(path) ? 'bold' : 'normal',
  });
  
  const renderMobileMenu = () => (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={toggleMobileMenu}
      PaperProps={{
        sx: {
          width: 240,
          bgcolor: 'background.paper',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))',
        }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MovieIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" sx={{ color: 'white' }}>
          FilmyYatra
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/" 
          onClick={toggleMobileMenu}
          selected={isActive('/')}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        
        <ListItem 
          button 
          component={Link} 
          to="/movies" 
          onClick={toggleMobileMenu}
          selected={isActive('/movies')}
        >
          <ListItemIcon>
            <SearchIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Search Movies" />
        </ListItem>
        
        <ListItem 
          button 
          component={Link} 
          to="/about" 
          onClick={toggleMobileMenu}
          selected={isActive('/about')}
        >
          <ListItemIcon>
            <InfoIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="About Me" />
        </ListItem>
        
        {isAuthenticated && (
          <ListItem 
            button 
            component={Link} 
            to="/recommendations" 
            onClick={toggleMobileMenu}
            selected={isActive('/recommendations')}
          >
            <ListItemIcon>
              <RecommendIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="Recommended" />
          </ListItem>
        )}
        
        {isAuthenticated ? (
          <>
            <ListItem 
              button 
              component={Link} 
              to="/profile" 
              onClick={toggleMobileMenu}
              selected={isActive('/profile')}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button onClick={() => { handleLogout(); toggleMobileMenu(); }}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem 
              button 
              component={Link} 
              to="/login" 
              onClick={toggleMobileMenu}
              selected={isActive('/login')}
            >
              <ListItemIcon>
                <LoginIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem 
              button 
              component={Link} 
              to="/signup" 
              onClick={toggleMobileMenu}
              selected={isActive('/signup')}
            >
              <ListItemIcon>
                <SignUpIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: scrolled 
          ? 'linear-gradient(to right, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.9))' 
          : 'transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <Toolbar>
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'white',
            flexGrow: 1
          }}
        >
          <MovieIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
          <Typography
            variant="h6"
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

        {isMobile ? (
          <>
            <IconButton 
              edge="end" 
              color="inherit" 
              aria-label="menu" 
              onClick={toggleMobileMenu}
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
            {renderMobileMenu()}
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              component={Link} 
              to="/" 
              sx={navButtonStyle('/')}
            >
              Home
            </Button>
            
            <Button 
              component={Link} 
              to="/movies" 
              sx={navButtonStyle('/movies')}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            
            <Button 
              component={Link} 
              to="/about" 
              sx={navButtonStyle('/about')}
              startIcon={<InfoIcon />}
            >
              About Me
            </Button>
            
            {isAuthenticated && (
              <Button 
                component={Link} 
                to="/recommendations" 
                sx={navButtonStyle('/recommendations')}
              >
                Recommended
              </Button>
            )}
            
            {isAuthenticated ? (
              <>
                <Tooltip title="Profile">
                  <IconButton 
                    component={Link} 
                to="/profile"
                    sx={{ 
                      ml: 1, 
                      color: 'white',
                      border: isActive('/profile') ? '2px solid' : 'none',
                      borderColor: 'primary.main',
                      borderRadius: '50%',
                      p: 0.5
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main',
                        width: 32,
                        height: 32
                      }}
                    >
                      {user?.name?.charAt(0) || <PersonIcon />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Logout">
                  <IconButton 
                    onClick={handleLogout}
                    sx={{ 
                      ml: 1, 
                      color: 'white',
                      '&:hover': {
                        color: 'error.main'
                      }
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
            </>
          ) : (
            <>
                <Button 
                  component={Link} 
                to="/login"
                  sx={navButtonStyle('/login')}
              >
                Login
                </Button>
                <Button 
                  component={Link} 
                to="/signup"
                  variant="contained" 
                  color="primary"
                  sx={{ 
                    ml: 2,
                    borderRadius: '20px',
                    px: 2,
                    py: 0.5,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    '&:hover': {
                      boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
              >
                Sign Up
                </Button>
            </>
          )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
