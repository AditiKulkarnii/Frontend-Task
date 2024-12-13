import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import ProfileCard from "../components/ProfileCard";
import MapComponent from "../components/MapComponent";
import profileService from "../services/profileServices";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import Spinner from "../components/Spinner"; // Import the Spinner component

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track error
  const navigate = useNavigate();

  // Fetch profiles when the component mounts
  useEffect(() => {
    profileService.getProfiles()
      .then((data) => {
        setProfiles(data);
        setFilteredProfiles(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError("Failed to load profiles. Please try again later."); // Set error message
        setLoading(false); // Set loading to false when there's an error
      });
  }, []);

  // Update filtered profiles whenever searchQuery, cityFilter, or profiles change
  useEffect(() => {
    let filtered = profiles;

    if (searchQuery) {
      filtered = filtered.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (cityFilter) {
      filtered = filtered.filter(
        (profile) => profile.address.city.toLowerCase() === cityFilter.toLowerCase()
      );
    }

    setFilteredProfiles(filtered);
  }, [searchQuery, cityFilter, profiles]);

  // Open the modal with the selected profile details
  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  return (
    <div className="homepage bg-gray-800 min-h-screen p-6">
      <div className="grid mb-4 pb-8 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
        {/* User Icon for Admin Dashboard Navigation */}
        <div className="absolute top-5 right-5">
          <FiUser
            size={24}
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200"
            onClick={() => navigate("/admin")}
            title="Go to Admin Dashboard"
          />
        </div>

        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Profile Viewer</h1>

        {/* Search Input */}
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Cities</option>
            {Array.from(new Set(profiles.map((p) => p.address.city))).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional Rendering for Loading, Error, or Profiles */}
        {loading && <Spinner />} {/* Show Spinner while loading */}
        {error && <div className="text-center text-red-600">{error}</div>} {/* Show error message */}
        
        {/* Profile List */}
        {!loading && !error && (
          <div className="profile-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSummaryClick={() => handleProfileClick(profile)} 
              />
            ))}
          </div>
        )}

        {/* React Modal for Profile Details */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                border: "3px solid #ccc",
              },
            }}
            ariaHideApp={false}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedProfile.name}</h2>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {selectedProfile.description}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Address:</strong> {selectedProfile.address.street}, {selectedProfile.address.city}, {selectedProfile.address.country}
            </p>

            {/* Map Component */}
            <MapComponent
              profiles={profiles}
              selectedProfile={selectedProfile}
              setSelectedProfile={setSelectedProfile}
            />

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Close
            </button>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HomePage;
