import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import weatherReducer from '../../features/weather/weatherSlice'; // Ensure correct path
import WeatherDisplay from '../../components/WeatherDisplay'; // Ensure correct path

// Mock matchMedia
global.matchMedia = jest.fn().mockImplementation(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));

// Mock state
const mockState = {
  weather: {
    data: {
      London: {
        main: {
          temp: 20,
          humidity: 50,
        },
        weather: [{ description: 'Clear sky', icon: '01d' }],
        wind: { speed: 5 },
        name: 'London',
      },
    },
    loading: false,
    error: null,
  },
};

// Create a mock store with the mock state
const store = createStore((state) => state, mockState);

test('renders WeatherDisplay component with weather data', () => {
  render(
    <Provider store={store}>
      <WeatherDisplay />
    </Provider>
  );

  // Check if the weather card data is displayed
  expect(screen.getByText(/London/i)).toBeInTheDocument();
  expect(screen.getByText(/20°C/i)).toBeInTheDocument(); // Check temperature
  expect(screen.getByText(/Humidity: 50%/i)).toBeInTheDocument(); // Check humidity
  expect(screen.getByText(/Wind Speed: 5 m\/s/i)).toBeInTheDocument(); // Check wind speed
  expect(screen.getByText(/Description: Clear sky/i)).toBeInTheDocument(); // Check description
});

test('renders loading spinner when loading is true', () => {
  // Update mock state for loading
  const loadingState = {
    weather: {
      data: null,
      loading: true,
      error: null,
    },
  };

  const loadingStore = createStore((state) => state, loadingState);

  render(
    <Provider store={loadingStore}>
      <WeatherDisplay />
    </Provider>
  );

  // Check if the loading spinner is rendered
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('renders error message when there is an error', () => {
  // Update mock state for error
  const errorState = {
    weather: {
      data: null,
      loading: false,
      error: 'Failed to fetch weather data',
    },
  };

  const errorStore = createStore((state) => state, errorState);

  render(
    <Provider store={errorStore}>
      <WeatherDisplay />
    </Provider>
  );

  // Check if the error message is rendered
  expect(screen.getByText(/Failed to fetch weather data/i)).toBeInTheDocument();
});