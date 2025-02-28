import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Predefined locations
const locations = [
    { id: 1, name: 'New York', position: [40.7128, -74.0060] },
    { id: 2, name: 'Nigeria', position: [9.64629, 8.47055] },
    { id: 3, name: 'Iran', position: [32.03379, 54.29387] },
    { id: 4, name: 'Nepal', position: [28.14009, 83.49103] },
    { id: 5, name: 'New Delhi', position: [28.62014, 77.20026] },
    { id: 6, name: 'bhubaneswar', position: [20.29630, 85.81768]},
    { id: 6, name: 'Mexico', position: [24.30469, -103.45683]}
];

const Dashboard = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMarkerClick = (location) => {
        setSelectedLocation(location);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ flex: 1 }}>
                <MapContainer center={[37.0902, -95.7129]} zoom={4} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {locations.map(location => (
                        <Marker key={location.id} position={location.position} eventHandlers={{
                            click: () => handleMarkerClick(location),
                        }}>
                            <Popup>{location.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f0f0f0' }}>
                <h2>Statistics</h2>
                <p>Total Markers: {locations.length}</p>
                {selectedLocation ? (
                    <div>
                        <h3>Selected Location:</h3>
                        <p>Name: {selectedLocation.name}</p>
                        <p>Coordinates: {selectedLocation.position.join(', ')}</p>
                    </div>
                ) : (
                    <p>Select a location to see details.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;