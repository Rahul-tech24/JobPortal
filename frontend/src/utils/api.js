const API_BASE_URL = 'http://localhost:5000/api/v1';

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Important: sends cookies with requests
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Auth APIs
export const authAPI = {
  register: (userData) => {
    return apiRequest('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: (credentials) => {
    return apiRequest('/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: () => {
    return apiRequest('/user/logout', {
      method: 'POST',
    });
  },

  updateProfile: (profileData) => {
    return apiRequest('/user/profile/update', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  getProfile: () => {
    return apiRequest('/user/profile', {
      method: 'GET',
    });
  },
};

// Job APIs
export const jobAPI = {
  getAllJobs: () => {
    return apiRequest('/job/get', {
      method: 'GET',
    });
  },

  getJobById: (id) => {
    return apiRequest(`/job/get/${id}`, {
      method: 'GET',
    });
  },

  createJob: (jobData) => {
    return apiRequest('/job/post', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  },

  getAdminJobs: () => {
    return apiRequest('/job/getadminjobs', {
      method: 'GET',
    });
  },
};

// Company APIs
export const companyAPI = {
  registerCompany: (companyData) => {
    return apiRequest('/company/register', {
      method: 'POST',
      body: JSON.stringify(companyData),
    });
  },

  getCompanies: () => {
    return apiRequest('/company/get', {
      method: 'GET',
    });
  },

  getCompanyById: (id) => {
    return apiRequest(`/company/get/${id}`, {
      method: 'GET',
    });
  },

  updateCompany: (id, companyData) => {
    return apiRequest(`/company/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify(companyData),
    });
  },
};

// Application APIs
export const applicationAPI = {
  applyJob: (jobId) => {
    return apiRequest(`/application/apply/${jobId}`, {
      method: 'POST',
    });
  },

  getAppliedJobs: () => {
    return apiRequest('/application/get', {
      method: 'GET',
    });
  },

  getApplicants: (jobId) => {
    return apiRequest(`/application/${jobId}/applicants`, {
      method: 'GET',
    });
  },

  updateStatus: (applicationId, status) => {
    return apiRequest(`/application/status/${applicationId}/update`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};
