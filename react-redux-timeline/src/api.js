// api.js
export const simulateApiCall = (actionType, payload) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(payload); // Simulate a successful API response
      }, 1000); // Simulate a delay of 1 second
    });
  };
  