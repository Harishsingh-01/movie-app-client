// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Recommendations from './pages/Recommendations';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import CategoryMovies from './pages/CategoryMovies';
import MovieDetails from './pages/MovieDetails';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import AboutMe from './pages/AboutMe';
import MovieTrailer from './pages/MovieTrailer';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100vh'
          }}>
            <Navbar />
            <Box sx={{ flex: 1, pt: { xs: 8, sm: 9 } }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/movies/:id/trailer" element={<MovieTrailer />} />
                <Route path="/category/:category" element={<CategoryMovies />} />
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                <Route path="/recommendations" element={<PrivateRoute><Recommendations /></PrivateRoute>} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
