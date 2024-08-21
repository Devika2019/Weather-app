import React, { useState,useEffect } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox,Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store'; // Import AppDispatch
import { fetchWeather, addCityWeather, removeCityWeather } from '../features/weather/weatherSlice';
import { WeatherParams, WeatherResponse } from '../features/weather/weatherInterfaces';
import { loadCountries } from '../features/countries/countriesSlice';

const SearchInput: React.FC = () => {
  const [city, setCity] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const dispatch = useDispatch();
  const weatherData = useSelector((state:any) => state.weather.data || {});
  const countries = useSelector((state: any) => state.countries.countries);
  const isCitySelected = (cityName: string) => selectedCities.includes(cityName);

  useEffect(() => {
    (dispatch as AppDispatch)(loadCountries());
  }, [dispatch]);

  const handleSearch = () => {
    if (city.trim()) {
      // Dispatch fetchWeather thunk action
      (dispatch as AppDispatch)(fetchWeather({ city }))
        .then((result) => {
          if (fetchWeather.fulfilled.match(result)) {
            // Optionally, you could add logic here if needed
          }
        })
        .catch((error) => {
          console.error('Failed to fetch weather data', error);
        });
    }
  };



  const handleCheckboxChange = (cityName: string) => {
    const updatedSelectedCities = isCitySelected(cityName)
      ? selectedCities.filter((item) => item !== cityName)
      : [...selectedCities, cityName];
    
    setSelectedCities(updatedSelectedCities);

    if (!isCitySelected(cityName)) {
      const lat = 33.44; // Placeholder latitude
      const lon = -94.04; // Placeholder longitude

      (dispatch as AppDispatch)(fetchWeather({ city: cityName })) 
        .then((result) => {
          if (result.meta.requestStatus === 'fulfilled') {
            dispatch(addCityWeather({ city: cityName, weatherData: result.payload }));
          }
        });
    } else {
      dispatch(removeCityWeather(cityName));
    }
  };

  return (
        <Box sx={{ maxWidth: 500, margin: '20px auto', textAlign: 'center' }}>
 <Autocomplete
        options={countries}
        renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" />}
        //onChange={(event, newValue: string | null) => setCity(newValue ?? '')}
      />
            
      <TextField
        fullWidth
        label="Search City"
        variant="outlined"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
      <Box sx={{ marginTop: 2 }}>
        {Object.keys(weatherData).map((cityName) => (
          <FormControlLabel
            key={cityName}
            control={
              <Checkbox
                checked={isCitySelected(cityName)}
                onChange={() => handleCheckboxChange(cityName)}
              />
            }
            label={cityName}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SearchInput;