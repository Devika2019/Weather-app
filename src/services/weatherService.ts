import axios from 'axios';
import { WeatherParams, WeatherResponse } from '../features/weather/weatherInterfaces';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY as string;

export const fetchWeather = async ({ city }: WeatherParams): Promise<WeatherResponse> => {
  console.log("api",API_KEY);
  try {
    const response = await axios.get<WeatherResponse>(API_BASE_URL, {
      params: {
        q: city, // Update parameter to 'q' as per OpenWeatherMap API
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};
