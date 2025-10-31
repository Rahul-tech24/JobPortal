import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../lib/axios';

// Async thunks
export const applyJob = createAsyncThunk(
  'application/applyJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/application/apply/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to apply for job');
    }
  }
);

export const getAppliedJobs = createAsyncThunk(
  'application/getAppliedJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/application/get');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
    }
  }
);

export const getApplicants = createAsyncThunk(
  'application/getApplicants',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/application/${jobId}/applicants`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch applicants');
    }
  }
);

export const updateStatus = createAsyncThunk(
  'application/updateStatus',
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/application/status/${applicationId}/update`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

// Slice
const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    applications: [],
    applicants: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearApplicants: (state) => {
      state.applicants = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply Job
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload.application);
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Applied Jobs
      .addCase(getAppliedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppliedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload.applications || [];
      })
      .addCase(getAppliedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Applicants
      .addCase(getApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.applicants = action.payload.applicants || [];
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Status
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.applicants.findIndex(a => a._id === action.payload.application._id);
        if (index !== -1) {
          state.applicants[index] = action.payload.application;
        }
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
