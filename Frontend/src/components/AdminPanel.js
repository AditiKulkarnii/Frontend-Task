import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import profileService from "../services/profileServices";  // Import the profileService

const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);

  // Fetch profiles from the API when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await profileService.getProfiles();  // Fetch profiles
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);
  console.log(profiles);

  // // Handler for deleting a profile
  // const handleDelete = async (id) => {
  //   try {
  //     await profileService.deleteProfile(id);  // Call deleteProfile from profileService
  //     setProfiles(profiles.filter((profile) => profile.id !== id));  // Remove from local state
  //   } catch (error) {
  //     console.error("Error deleting profile:", error);
  //   }
  // };

  // Handler for adding a new profile
  // const handleAddProfile = async () => {
  //   // New profile data
  //   const newProfile = {
  //     name: "New User",
  //     photo: "https://via.placeholder.com/150",  // Default placeholder image
  //     description: "Description of the new user.",
  //     address: {
  //       street: "123 New St",
  //       city: "New City",
  //       country: "New Country",
  //       lat: 0.0,  // Default latitude
  //       lng: 0.0,  // Default longitude
  //     },
  //   };

  //   try {
  //     // Add the new profile via profileService
  //     await profileService.addProfile(newProfile);
  //     // Fetch updated profiles and update the state
  //     const updatedProfiles = await profileService.getProfiles();
  //     setProfiles(updatedProfiles);
  //   } catch (error) {
  //     console.error("Error adding profile:", error);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
     <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
  {/* Add Profile Button */}
  <button
    // onClick={handleAddProfile}
    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md flex items-center gap-1 "
  >
    <FaPlus />
    Add Profile
  </button>
</div>
      {/* Profiles Grid */}
      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white p-4 shadow-md rounded-md mb-4 border-green-400 border-2"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Profile Image */}
              <div className="w-28 h-28">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              {/* Profile Details */}
              <div className="flex flex-col flex-grow">
                <p className="text-lg text-gray-800 font-semibold">
                  {profile.name}
                </p>
                <p className="text-gray-600">{profile.description}</p>
                <p className="text-xs text-gray-600">
                  {profile.address.street}, {profile.address.city}, {profile.address.country}
                </p>
              </div>
              {/* Profile Price */}
              <div className="self-center flex gap-2">
                <button
                  // onClick={() => handleDelete(profile.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete"
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
