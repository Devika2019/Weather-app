import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeather as fetchWeatherService } from '../../services/weatherService';
import { WeatherParams, WeatherResponse } from './weatherInterfaces';
import { logout } from '../user/userSlice'; // Adjust the import path as necessary

export interface WeatherState {
  data: { [city: string]: WeatherResponse } | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (params: WeatherParams) => {
    const response = await fetchWeatherService(params);
    return response;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCityWeather: (state, action) => {
      const { city, weatherData } = action.payload;
      if (state.data) {
        state.data[city] = weatherData;
      } else {
        state.data = { [city]: weatherData };
      }
    },
    removeCityWeather: (state, action) => {
      const city = action.payload;
      if (state.data) {
        delete state.data[city];
      }
    },
    clearWeatherData: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        const city = action.meta.arg.city;
        if (state.data) {
          state.data[city] = action.payload;
        } else {
          state.data = { [city]: action.payload };
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(logout, (state) => {
        state.data = {}; // Clear weather data on logout
      });
  },
});

export const { addCityWeather, removeCityWeather, clearWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
