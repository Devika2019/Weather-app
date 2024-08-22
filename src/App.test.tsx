import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import userReducer from '../src/features/user/userSlice';
import weatherReducer from '../src/features/weather/weatherSlice';
import { logout } from '../src/features/user/userSlice';
import { clearWeatherData } from '../src/features/weather/weatherSlice';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Mock the components used in App
jest.mock('../src/components/SearchInput', () => () => <div>SearchInput Component</div>);
jest.mock('../src/components/WeatherDisplay', () => () => <div>WeatherDisplay Component</div>);
jest.mock('../src/components/Login', () => () => <div>Login Component</div>);
describe('App Component', () => {
  // Create a mock store with user logged in
  const storeWithUser = configureStore({
    reducer: {
      user: userReducer,
      weather: weatherReducer,
    },
    preloadedState: {
      user: { username: 'testUser' },
      weather: { data: {}, loading: false, error: null },
    },
  });

  // Create a mock store with no user logged in
  const storeWithoutUser = configureStore({
    reducer: {
      user: userReducer,
      weather: weatherReducer,
    },
    preloadedState: {
      user: { username: null },
      weather: { data: {}, loading: false, error: null },
    },
  });

  test('renders App component with user logged in', () => {
    render(
      <Provider store={storeWithUser}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Weather App')).toBeInTheDocument();
    expect(screen.getByText('Welcome, testUser')).toBeInTheDocument();
    expect(screen.getByText('SearchInput Component')).toBeInTheDocument();
    expect(screen.getByText('WeatherDisplay Component')).toBeInTheDocument();
  });

  test('renders Login component when no user is logged in', () => {
    render(
      <Provider store={storeWithoutUser}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Weather App')).toBeInTheDocument();
    expect(screen.queryByText('Welcome, testUser')).toBeNull();
    expect(screen.queryByText('SearchInput Component')).toBeNull();
    expect(screen.queryByText('WeatherDisplay Component')).toBeNull();
    expect(screen.getByText('Login Component')).toBeInTheDocument();
  });

  test('clicking logout button dispatches logout action and clears weather data', () => {
    const mockDispatch = jest.fn();
    storeWithUser.dispatch = mockDispatch;

    render(
      <Provider store={storeWithUser}>
        <App />
      </Provider>
    );

    // Locate the logout button using data-testid
    const logoutButton = screen.getByTestId('logout-button');
    expect(logoutButton).toBeInTheDocument();

    // Click the logout button
    fireEvent.click(logoutButton);

    // Check if the logout and clearWeatherData actions were dispatched
    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(mockDispatch).toHaveBeenCalledWith(clearWeatherData());
  });
});