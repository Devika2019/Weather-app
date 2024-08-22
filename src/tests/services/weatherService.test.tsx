const axios = require('axios');
const { fetchWeather } = require('../../services/weatherService'); 

jest.mock('axios');
const mockedAxios = axios;

describe('fetchWeather', () => {
  it('should fetch weather data successfully', async () => {
    // Arrange
    const mockWeatherData = {
      main: {
        temp: 25,
        humidity: 60,
      },
      weather: [{ description: 'Clear sky', icon: '01d' }],
      wind: { speed: 5 },
      name: 'London',
    };
    
    mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

    const city = 'London';
    const params = { city };

    // Act
    const result = await fetchWeather(params);

    // Assert
    expect(result).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: process.env.REACT_APP_WEATHER_API_KEY,
        units: 'metric',
      },
    });
  });

  it('should handle errors during fetch', async () => {
    // Arrange
    const errorMessage = 'Failed to fetch weather data';
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const city = 'London';
    const params = { city };

    // Act & Assert
    await expect(fetchWeather(params)).rejects.toThrow(errorMessage);
    expect(mockedAxios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: process.env.REACT_APP_WEATHER_API_KEY,
        units: 'metric',
      },
    });
  });
});

export {}