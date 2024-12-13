import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for the missing marker icon
const DefaultIcon = L.icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle dynamic zoom and centering
const FlyToLocation = ({ lat, lng }) => {
  const map = useMap();
  React.useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 10, { duration: 1.5 }); // Smoothly fly to the selected location
    }
  }, [lat, lng, map]);
  return null;
};

const MapComponent = ({ profiles, selectedProfile }) => {
  const markerRefs = React.useRef({});

  const handleMouseOver = (id) => {
    if (markerRefs.current[id]) {
      markerRefs.current[id].openPopup();
    }
  };

  const handleMouseOut = (id) => {
    if (markerRefs.current[id]) {
      markerRefs.current[id].closePopup();
    }
  };

  return (
    <MapContainer
      center={[selectedProfile?.address.lat || 51.505, selectedProfile?.address.lng || -0.09]}
      zoom={selectedProfile ? 10 : 2}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Fly to the selected profile's location */}
      {selectedProfile && (
        <FlyToLocation lat={selectedProfile.address.lat} lng={selectedProfile.address.lng} />
      )}

      {/* Add markers for all profiles */}
      {profiles.map((profile) => (
        <Marker
          key={profile.id}
          position={[profile.address.lat, profile.address.lng]}
          ref={(el) => (markerRefs.current[profile.id] = el)}
          eventHandlers={{
            mouseover: () => handleMouseOver(profile.id),
            mouseout: () => handleMouseOut(profile.id),
          }}
        >
          <Popup autoClose={false} closeOnClick={false}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={profile.photo}
                alt={`${profile.name}'`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <strong>{profile.name}</strong>
                <p style={{ margin: 0 }}>{profile.description}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
