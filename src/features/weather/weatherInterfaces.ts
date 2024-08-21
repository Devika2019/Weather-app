export interface WeatherParams {
        city: string;
  }
  
  export interface WeatherResponse {
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    name: string; // City name
    timezone: number; // Timezone offset in seconds
  }
  