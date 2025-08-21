import axios from "axios";

// Create a specific axios instance for Gemini API calls
// This avoids conflicts with the main app's API configuration
const geminiClient = axios.create({
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for CORS-related issues
geminiClient.interceptors.request.use(config => {
  return config;
}, error => {
  // Handle request errors
  console.error("Error in Gemini API request configuration:", error);
  return Promise.reject(error);
});

// Add response interceptor
geminiClient.interceptors.response.use(
  (response) => {
    // Log successful responses
    console.log("Gemini API response received successfully");
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Gemini API Error Response:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Gemini API No Response Error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Gemini API Setup Error:", error.message);
    }
    
    // Never redirect to login for Gemini API errors
    return Promise.reject(error);
  }
);

export default geminiClient; 