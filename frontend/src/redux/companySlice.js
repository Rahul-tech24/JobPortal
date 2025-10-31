import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../lib/axios';

// Async thunks
export const registerCompany = createAsyncThunk(
  'company/registerCompany',
  async (companyData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/company/register', companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to register company');
    }
  }
);

export const getCompanies = createAsyncThunk(
  'company/getCompanies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/company/get');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch companies');
    }
  }
);

export const getCompanyById = createAsyncThunk(
  'company/getCompanyById',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/company/get/${companyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch company');
    }
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ companyId, companyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/company/update/${companyId}`, companyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update company');
    }
  }
);

// Slice
const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    selectedCompany: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedCompany: (state) => {
      state.selectedCompany = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Company
      .addCase(registerCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload.company);
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Companies
      .addCase(getCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload.companies || [];
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Company By ID
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCompany = action.payload.company;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Company
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.companies.findIndex(c => c._id === action.payload.company._id);
        if (index !== -1) {
          state.companies[index] = action.payload.company;
        }
        if (state.selectedCompany?._id === action.payload.company._id) {
          state.selectedCompany = action.payload.company;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
