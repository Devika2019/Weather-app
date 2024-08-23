import axios from 'axios';

const API_URL = 'https://countriesnow.space/api/v0.1/countries';
//fetching  list of countries and corresponding cities
export const fetchCountries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; 
  } catch (error) {
    console.error('Failed to fetch countries', error);
    throw error;
  }
};
