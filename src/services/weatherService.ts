import axios from 'axios';
import { WeatherParams, WeatherResponse } from '../features/weather/weatherInterfaces';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY as string;

export const fetchWeather = async ({ city }: WeatherParams): Promise<WeatherResponse> => {
  console.log("api", API_KEY);
  try {
    const response = await axios.get<WeatherResponse>(API_BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to fetch weather data', error);
      // Default empty WeatherResponse object
      const defaultWeatherResponse: WeatherResponse = {
        main: {
          temp: 0,
          humidity: 0,
        },
        wind: {
          speed: 0,
        },
        weather: [{
          description: 'No data available',
          icon: '01d',
        }],
        name: city, // City name
        timezone: 0, // Timezone offset in seconds
      };
      return defaultWeatherResponse;
  }
};
