import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import WeatherCard from './WeatherCard';

const WeatherDisplay: React.FC = () => {
  const weatherData = useSelector((state:any) => state.weather.data);
  const loading = useSelector((state:any) => state.weather.loading);
  const error = useSelector((state:any) => state.weather.error);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      {weatherData ? (
        Object.keys(weatherData).map((city) => (
          <WeatherCard key={city} weatherData={weatherData[city]} />
        ))
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};

export default WeatherDisplay;
