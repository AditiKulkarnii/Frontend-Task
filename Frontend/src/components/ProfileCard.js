import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Spinner from "./Spinner";  
import "./ProfileCard.css";

const ProfileCard = ({ profile, onSummaryClick }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);  
  const [hasError, setHasError] = useState(false);  

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle image loading error
  const handleImageError = () => {
    setHasError(true);
  };

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  if (isLoading) {
    return <Spinner />;  
  }

  if (hasError) {
    return (
      <div className="text-center">
        <h2 className="text-red-600">Error loading profile</h2>
        <p className="text-gray-700">Something went wrong. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <img
        src={profile.photo}
        alt={`${profile.name}'`}
        className="profile-photo"
        onClick={handleImageClick} 
        onError={handleImageError} // Handle image load error
      />
      <h2 className="profile-name">{profile.name}</h2>
      <p className="profile-description">{profile.description}</p>
      <button onClick={onSummaryClick} className="summary-button">
        Summary
      </button>

      {/* Image Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onRequestClose={closeImageModal}
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
            backgroundColor: "#f0f9ff",
            border: "3px solid #ccc",
          },
        }}
        ariaHideApp={false}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{profile.name}</h2>
        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> {profile.description}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Address:</strong> {profile.address.street}, {profile.address.city}, {profile.address.country}
        </p>

        {/* Displaying Contact Information */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Contact</h3>
          <p className="text-gray-700"><strong>Email:</strong> {profile.contact.email}</p>
          <p className="text-gray-700"><strong>Phone:</strong> {profile.contact.phone}</p>
        </div>

        {/* Displaying Interests */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Interests</h3>
          <ul className="list-disc pl-5">
            {profile.interests.map((interest, index) => (
              <li key={index} className="text-gray-700">{interest}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={closeImageModal}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ProfileCard;
