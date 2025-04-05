import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  OutlinedInput
} from '@mui/material';

const genres = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Documentary'
];

const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Malayalam', 'Kannada'];

const PreferencesForm = ({ open, onClose, onSubmit }) => {
  const [preferences, setPreferences] = useState({
    genres: [],
    languages: []
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: 'background.paper'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Set Your Preferences
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select your favorite genres and languages to get personalized recommendations
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="genres-label">Favorite Genres</InputLabel>
              <Select
                labelId="genres-label"
                id="genres"
                multiple
                value={preferences.genres}
                onChange={handleChange('genres')}
                input={<OutlinedInput label="Favorite Genres" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300
                    }
                  }
                }}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="languages-label">Preferred Languages</InputLabel>
              <Select
                labelId="languages-label"
                id="languages"
                multiple
                value={preferences.languages}
                onChange={handleChange('languages')}
                input={<OutlinedInput label="Preferred Languages" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300
                    }
                  }
                }}
              >
                {languages.map((language) => (
                  <MenuItem key={language} value={language}>
                    {language}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={preferences.genres.length === 0 || preferences.languages.length === 0}
          >
            Save Preferences
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PreferencesForm; 