import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../lib/axios';

// Async thunks
export const getAllJobs = createAsyncThunk(
  'job/getAllJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/job/get');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
    }
  }
);

export const getJobById = createAsyncThunk(
  'job/getJobById',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/job/get/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch job');
    }
  }
);

export const createJob = createAsyncThunk(
  'job/createJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/job/post', jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create job');
    }
  }
);

export const getAdminJobs = createAsyncThunk(
  'job/getAdminJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/job/getadminjobs');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin jobs');
    }
  }
);

// Slice
const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: [],
    selectedJob: null,
    adminJobs: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Jobs
      .addCase(getAllJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs || [];
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Job By ID
      .addCase(getJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedJob = action.payload.job;
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Job
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.adminJobs.push(action.payload.job);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Admin Jobs
      .addCase(getAdminJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdminJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.adminJobs = action.payload.jobs || [];
      })
      .addCase(getAdminJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;
