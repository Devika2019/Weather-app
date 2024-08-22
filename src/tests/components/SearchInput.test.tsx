import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import SearchInput from '../../components/SearchInput';
import weatherReducer, { addCityWeather, removeCityWeather } from '../../features/weather/weatherSlice';
import countriesReducer from '../../features/countries/countriesSlice';

// Mock the necessary dispatch functions
jest.mock('../../features/weather/weatherSlice', () => ({
  fetchWeather: jest.fn().mockImplementation(() => Promise.resolve({ meta: { requestStatus: 'fulfilled' }, payload: {} })),
  addCityWeather: jest.fn(),
  removeCityWeather: jest.fn(),
}));

jest.mock('../../features/countries/countriesSlice', () => ({
  loadCountries: jest.fn().mockImplementation(() => Promise.resolve([{ country: 'USA' }, { country: 'Canada' }])),
  loadCities: jest.fn().mockImplementation(() => Promise.resolve(['New York', 'Toronto'])),
}));

// Create the mock store with valid reducers
const mockStore = (state: any) => {
  return createStore(
    combineReducers({
      weather: weatherReducer,
      countries: countriesReducer,
    }),
    state
  );
};

describe('SearchInput Component', () => {
  const initialState = {
    weather: { data: {}, loading: false, error: null },
    countries: { countries: [{ country: 'USA' }, { country: 'Canada' }], citiesByCountry: { USA: ['New York'], Canada: ['Toronto'] } },
  };

  test('renders SearchInput component correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <SearchInput />
      </Provider>
    );
    expect(screen.getByText(/Search and Select Cities/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select City/i)).toBeInTheDocument();
  });

  test('loads and displays cities when a country is selected', async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <SearchInput />
      </Provider>
    );

    // Simulate selecting a country
    fireEvent.change(screen.getByLabelText(/Select Country/i), { target: { value: 'USA' } });

    // Wait for the cities to load
    await waitFor(() => {
      expect(screen.getByLabelText(/Select City/i)).toBeInTheDocument();
      expect(screen.getByText('New York')).toBeInTheDocument();
    });
  });

  test('fetches weather and updates state when a city is selected', async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <SearchInput />
      </Provider>
    );

    // Simulate selecting a city
    fireEvent.change(screen.getByLabelText(/Select City/i), { target: { value: 'New York' } });
    fireEvent.click(screen.getByLabelText('New York'));

    // Wait for the weather data to be fetched
    await waitFor(() => {
      expect(fetchWeather).toHaveBeenCalledWith({ city: 'New York' });
      expect(addCityWeather).toHaveBeenCalledWith({ city: 'New York', weatherData: {} });
    });
  });

  test('removes city weather when checkbox is unchecked', async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <SearchInput />
      </Provider>
    );

    // Simulate selecting a city
    fireEvent.change(screen.getByLabelText(/Select City/i), { target: { value: 'New York' } });
    fireEvent.click(screen.getByLabelText('New York'));

    // Uncheck the checkbox
    fireEvent.click(screen.getByLabelText('New York'));

    // Wait for the city weather to be removed
    await waitFor(() => {
      expect(removeCityWeather).toHaveBeenCalledWith('New York');
    });
  });
});
