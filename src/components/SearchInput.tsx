import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox, Autocomplete, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchWeather, addCityWeather, removeCityWeather } from '../features/weather/weatherSlice';
import { WeatherParams, WeatherResponse } from '../features/weather/weatherInterfaces';
import { loadCountries, loadCities } from '../features/countries/countriesSlice';

const SearchInput: React.FC = () => {
  const [city, setCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string[] | null>(null);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const dispatch = useDispatch();
  const weatherData = useSelector((state: any) => state.weather.data || {});
  const countries = useSelector((state: any) => state.countries.countries);
  const isCitySelected = (cityName: string) => selectedCities.includes(cityName);
  const citiesByCountry = useSelector((state: any) => state.countries.citiesByCountry);

  useEffect(() => {
    (dispatch as AppDispatch)(loadCountries());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCountry) {
      (dispatch as AppDispatch)(loadCities(selectedCountry));
    }
  }, [selectedCountry, dispatch]);

  const countryOptions = countries.map((country: { country: string }) => country.country);
  const selectedCountryCities = selectedCountry ? citiesByCountry[selectedCountry] || [] : [];

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
    <Box sx={{
      maxWidth: 600,
      margin: '20px auto',
      padding: 2,
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: 2,
      boxShadow: 3
    }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, color: '#0277bd', fontWeight: 'bold' }}
      >
        Search and Select Cities
      </Typography>
      <Autocomplete
        sx={{ marginBottom: 2 }}
        options={countryOptions}
        renderInput={(params) => <TextField {...params} label="Select Country" variant="outlined" />}
        onChange={(event, newValue: string | null) => setSelectedCountry(newValue)}
      />

      <Autocomplete
        multiple
        options={selectedCountryCities}
        value={selectedCity || []}
        onChange={(event, newValue: string[] | null) => setSelectedCity(newValue)}
        renderTags={() => null} // Hide the selected values
        renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" />}
      />

      <Box sx={{ 
display: 'flex', 
alignItems: 'center',
gap: 1 
}}>
        {selectedCity?.map((cityName: any) => (
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
