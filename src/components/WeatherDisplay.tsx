import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import WeatherCard from './WeatherCard';
import Slider from 'react-slick';
import './WeatherDisplay.css';

const WeatherDisplay: React.FC = () => {
  const weatherData = useSelector((state: any) => state.weather.data);
  const loading = useSelector((state: any) => state.weather.loading);
  const error = useSelector((state: any) => state.weather.error);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderWeatherCards = () => {
    return Object.keys(weatherData).map((city) => (
      <div key={city} className="weather-card-container">
        <WeatherCard weatherData={weatherData[city]} />
      </div>
    ));
  };

  return (
    <Box className="weather-display">
      {weatherData && Object.keys(weatherData).length > 0 ? (
        Object.keys(weatherData).length > 3 ? (
          <Slider {...settings} className="weather-carousel">
            {renderWeatherCards()}
          </Slider>
        ) : (
          <Box className="weather-card-row">
            {renderWeatherCards()}
          </Box>
        )
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};

export default WeatherDisplay;
