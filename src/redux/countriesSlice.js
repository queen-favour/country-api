import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

// Thunk to fetch all countries
export const getAllCountries = createAsyncThunk(
  'countries/getAllCountries',
  async () => {
    const response = await axiosInstance.get('/all');
    console.log(response?.data)
    return response.data;
  }
);

// Thunk to get a country by ID
export const getCountryById = createAsyncThunk(
  'countries/getCountryById',
  async (id) => {
    const response = await axiosInstance.get(`/alpha/${id}`);
    console.log(response?.data[0])
    return response.data[0];
  }
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    allCountries: [],
    selectedCountry: null,
    region: 'all',
    searchQuery: '',
    loading: false,
    error: null,
  },
  reducers: {
    filterByRegion: (state, action) => {
      state.region = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.allCountries = action.payload;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCountryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCountryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCountry = action.payload;
      })
      .addCase(getCountryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filterByRegion, setSearchQuery } = countriesSlice.actions;

export default countriesSlice.reducer;
