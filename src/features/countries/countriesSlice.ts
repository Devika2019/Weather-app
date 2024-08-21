import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCountries } from '../../services/countryService';

interface CountriesState {
  countries: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
};

export const loadCountries = createAsyncThunk(
  'countries/loadCountries',
  async () => {
    const countries = await fetchCountries();
    return countries.map((x: { country: string }) => x.country);
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
      });
  },
});

export default countriesSlice.reducer;
