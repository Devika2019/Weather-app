import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCountries } from '../../services/countryService';


interface Country {
    iso2: string;
    iso3: string;
    country: string;
    cities: string[];
  }

  interface CountriesState {
    countries: Country[];
    citiesByCountry: Record<string, string[]>; 
    cities: string[];
    loading: boolean;
    error: string | null;
  }
  

const initialState: CountriesState = {
  countries:[] ,
  citiesByCountry: {},
  cities: [],
  loading: false,
  error: null,
};

export const loadCountries = createAsyncThunk(
  'countries/loadCountries',
  async () => {
    const countries = await fetchCountries();
    return countries;
     //return countries.map((x: { country: string }) => x.country);
  }
);

export const loadCities = createAsyncThunk(
    'countries/loadCities',
    async (selected: string, { getState }) => {
      const state = getState() as { countries: CountriesState };
      const countryData = state.countries.countries.find(c => c.country === selected);
      return { country: selected, cities: countryData?.cities || [] };
    }
  );
  
const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load countries';
      })
      .addCase(loadCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCities.fulfilled, (state, action) => {
        state.loading = false;
        state.citiesByCountry[action.payload.country] = action.payload.cities;
      })
      .addCase(loadCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load countries';
      });
  },
});

export default countriesSlice.reducer;
