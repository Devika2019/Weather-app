import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { WeatherResponse } from '../features/weather/weatherInterfaces';

interface WeatherCardProps {
  weatherData: WeatherResponse;
}
// Display weather data in cards
const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { main, weather, wind, name } = weatherData;
  const { temp, humidity } = main;
  const weatherDescription = weather[0]?.description || 'No description';
  const weatherIcon = weather[0]?.icon || '';
  const { speed } = wind;

  return (
    <Card 
      sx={{ 
        width: 300, 
        margin: '20px auto', 
        borderRadius: 2, 
        boxShadow: 3,
        backgroundColor: '#fff'
      }}
    >
      <CardContent>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            color: '#0277bd', 
            marginBottom: 1          
          }}
        >
          {name}
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 1,
            justifyContent:'center'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#333', 
              marginRight: 1 
            }}
          >
            {temp}°C
          </Typography>
          {weatherIcon && (
            <Avatar 
              src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} 
              alt={weatherDescription} 
              sx={{ 
                width: 50, 
                height: 50, 
                borderRadius: '50%', 
                backgroundColor: '#e0f7fa' 
              }} 
            />
          )}
        </Box>
        <Typography 
          variant="body1" 
          sx={{ color: '#555', marginBottom: 0.5 }}
        >
          Humidity: {humidity}%
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: '#555', marginBottom: 0.5 }}
        >
          Wind Speed: {speed} m/s
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ color: '#555' }}
        >
          Description: {weatherDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
