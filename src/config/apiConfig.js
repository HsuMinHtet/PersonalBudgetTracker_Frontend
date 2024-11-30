const API_BASE_URL = "http://localhost:8080/api/v1";

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/authenticate`,
  REGISTER: `${API_BASE_URL}/auth/account-holder-register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
};

//Admin Endpoints
export const ADMIN_ENDPOINTS = {
  // GET_ACCOUNT_CRITERIA: `${API_BASE_URL}/account-holder/criteria`,
  GET_ALL_ACCOUNT: `${API_BASE_URL}/account-holder`, //ADMIN DASHBOARD
  DEL_ACCOUNT_ID: (id) => `${API_BASE_URL}/account-holder/${id}`,
};

// Account Holder Profile Endpoints
export const ACCOUNT_HOLDER_ENDPOINTS = {
  GET_PROFILE: (id) => `${API_BASE_URL}/account-holder/${id}`,
  UPDATE_PROFILE: (id) => `${API_BASE_URL}/account-holder/${id}`,
  PATCH_PROFILE: (id) => `${API_BASE_URL}/account-holder/${id}`, //reset password
};

// Transaction Endpoints
export const TRANSACTION_ENDPOINTS = {
  GET_ALL_TRAN: `${API_BASE_URL}/transaction`, //ACCOUNT_HOLDER DASHBOARD
  POST_TRAN: `${API_BASE_URL}/transaction`,
  PUT_TRAN_ID: (id) => `${API_BASE_URL}/transaction/${id}`,
  GET_TRAN_ID: (id) => `${API_BASE_URL}/transaction/${id}`,
  // GET_TRAN_CRITERIA: `${API_BASE_URL}/transaction/criteria`,
  DEL_TRAN_ID: (id) => `${API_BASE_URL}/transaction/${id}`,
};

// Category Endpoints
export const CATEGORY_ENDPOINTS = {
  GET_ALL_CAT: `${API_BASE_URL}/category`,
  POST_CAT: `${API_BASE_URL}/category`,
  PUT_CAT_ID: (id) => `${API_BASE_URL}/category/${id}`,
  GET_CAT_ID: (id) => `${API_BASE_URL}/category/${id}`,
  //GET_CAT_CRITERIA: `${API_BASE_URL}/category/criteria`,
  DEL_CAT_ID: (id) => `${API_BASE_URL}/category/${id}`,
};
export default API_BASE_URL;
