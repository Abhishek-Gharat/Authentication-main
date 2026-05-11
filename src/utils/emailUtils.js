// Function to clean email for CRUD CRUD API
// Remove @ and dots from email to make it URL-safe
export const cleanEmailForAPI = (email) => {
  if (!email) return '';
  return email.replace(/@/g, '').replace(/\./g, '');
};
