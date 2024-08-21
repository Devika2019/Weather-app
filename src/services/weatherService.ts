import axios from 'axios';
import { WeatherParams, WeatherResponse } from '../features/weather/weatherInterfaces';

const API_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY as string;

export const fetchWeather = async ({ lat, lon }: WeatherParams): Promise<WeatherResponse> => {
  try {
    const response = await axios.get<WeatherResponse>(API_BASE_URL, {
      params: {
        lat,
        lon,
        exclude: 'hourly,daily',
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};