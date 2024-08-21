import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { WeatherResponse } from '../features/weather/weatherInterfaces';

interface WeatherCardProps {
  weatherData: WeatherResponse;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { current } = weatherData;
  const { temp, humidity, wind_speed, weather } = current;
  const weatherDescription = weather[0]?.description || 'No description';
  const weatherIcon = weather[0]?.icon || '';

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5">Current Weather</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">Temperature: {temp}°C</Typography>
          {weatherIcon && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
              alt={weatherDescription}
              style={{ marginLeft: 10 }}
            />
          )}
        </Box>
        <Typography>Humidity: {humidity}%</Typography>
        <Typography>Wind Speed: {wind_speed} m/s</Typography>
        <Typography>Description: {weatherDescription}</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;