import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeatherCard from '../../components/WeatherCard';
import { WeatherResponse } from '../../features/weather/weatherInterfaces';

// Mock weather data
const mockWeatherData: WeatherResponse = {
    name: 'San Francisco',
    main: {
        temp: 22,
        humidity: 78,
    },
    weather: [
        {
            description: 'clear sky',
            icon: '01d',
        },
    ],
    wind: {
        speed: 3.5,
    },
    timezone: 0
};

describe('WeatherCard Component', () => {
  test('renders with correct data', () => {
    render(<WeatherCard weatherData={mockWeatherData} />);

    expect(screen.getByText('San Francisco')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 78%')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed: 3.5 m/s')).toBeInTheDocument();
    expect(screen.getByText('Description: clear sky')).toBeInTheDocument();

    const weatherIcon = screen.getByAltText('clear sky');
    expect(weatherIcon).toHaveAttribute('src', 'http://openweathermap.org/img/wn/01d.png');
  });

  test('renders with missing weather description', () => {
    const mockDataWithoutDescription: WeatherResponse = {
      ...mockWeatherData,
      weather: [{} as any], // Force an empty weather object
    };

    render(<WeatherCard weatherData={mockDataWithoutDescription} />);

    // Using a regex to match "No description"
    expect(screen.getByText(/No description/i)).toBeInTheDocument();
  });

  test('renders with missing weather icon', () => {
    const mockDataWithoutIcon: WeatherResponse = {
      ...mockWeatherData,
      weather: [{
          description: 'clear sky',
          icon: ''
      }],
    };

    render(<WeatherCard weatherData={mockDataWithoutIcon} />);

    expect(screen.queryByAltText('clear sky')).not.toBeInTheDocument();
  });
});
