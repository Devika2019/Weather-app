import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import WeatherCard from './WeatherCard';

const WeatherDisplay: React.FC = () => {
  const weatherData = useSelector((state: any) => state.weather.data);
  const loading = useSelector((state: any) => state.weather.loading);
  const error = useSelector((state: any) => state.weather.error);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div>

      <Box sx={{ display: 'flex', alignItems: 'center' ,gap: 5}}>
      {weatherData && Object.keys(weatherData).length > 0 ? (
        Object.keys(weatherData).map((city) => (
          <WeatherCard key={city} weatherData={weatherData[city]} />
        ))
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
    </div>
    
  );
};

export default WeatherDisplay;
