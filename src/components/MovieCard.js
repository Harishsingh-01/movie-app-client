import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Rating,
  CardActionArea
} from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(145deg, #1e1e1e 0%, #2d2d2d 100%)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
        }
      }}
    >
      <CardActionArea onClick={() => navigate(`/movies/${movie._id}`)}>
        <CardMedia
          component="img"
          height="300"
          image={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {movie.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <StarIcon sx={{ color: 'primary.main', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {movie.rating ? movie.rating.toFixed(1) : 'N/A'}
            </Typography>
          </Box>
          
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
            {Array.isArray(movie.genre) 
              ? movie.genre.join(', ') 
              : movie.genre || 'No genre information'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard; 