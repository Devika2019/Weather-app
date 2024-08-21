export interface WeatherParams {
    lat: number;
    lon: number;
    city: string;
  }
  
  export interface WeatherResponse {
    current: {
      temp: number;
      humidity: number;
      wind_speed: number;
      weather: Array<{
        description: string;
        icon: string;
      }>;
    };
    lat: number;
    lon: number;
    timezone: string;
  }