const API_URL = "http://localhost:5000/api/profiles";

const getProfiles = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

const addProfile = async (profile) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
};

const deleteProfile = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// Assign object to a variable
const profileService = {
  getProfiles,
  addProfile,
  deleteProfile,
};

// Export the variable
export default profileService;
