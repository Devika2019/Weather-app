import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import WeatherCard from './WeatherCard';
import Slider from 'react-slick';
import './WeatherDisplay.css';

// Custom Arrow Component
const Arrow = ({ className, style, onClick }: any) => (
  <div
    className={className}
    style={{ ...style, display: 'block', background: 'black', borderRadius: '50%' }}
    onClick={onClick}
  />
);

const WeatherDisplay: React.FC = () => {
  const weatherData = useSelector((state: any) => state.weather.data);
  const loading = useSelector((state: any) => state.weather.loading);
  const error = useSelector((state: any) => state.weather.error);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const settings = {
    dots: false, // Disable dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <Arrow className="slick-next" />,
    prevArrow: <Arrow className="slick-prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
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
