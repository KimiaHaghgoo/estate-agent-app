import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageGallery from 'react-image-gallery';
import propertiesData from '../data/properties.json';
import 'react-tabs/style/react-tabs.css';
import 'react-image-gallery/styles/css/image-gallery.css';
import './PropertyPage.css';

// Individual property page with gallery and detailed information
function PropertyPage({ addToFavourites, favourites }) {
  // Get property ID from URL params
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  // Load property data when component mounts or ID changes
  useEffect(() => {
    const foundProperty = propertiesData.find(p => p.id === parseInt(id));
    setProperty(foundProperty);
  }, [id]);

  // Show loading state while property loads
  if (!property) {
    return (
      <div className="property-page">
        <div className="loading">Loading property details...</div>
      </div>
    );
  }

  // Format images for the gallery component
  const galleryImages = property.images.map(img => ({
    original: img,
    thumbnail: img,
    originalAlt: property.address,
    thumbnailAlt: property.address
  }));

  // Format price
  const formatPrice = (price) => {
    return '£' + price.toLocaleString('en-GB');
  };

  // Check if already in favourites
  const isFavourite = favourites.some(fav => fav.id === property.id);

  return (
    <div className="property-page">
      {/* Back navigation */}
      <div className="property-nav">
        <Link to="/" className="btn-back">← Back to Search</Link>
      </div>

      <div className="property-container">
        {/* Image Gallery Section */}
        <div className="gallery-section">
          <ImageGallery
            items={galleryImages}
            showPlayButton={false}
            showFullscreenButton={true}
            showThumbnails={true}
            thumbnailPosition="bottom"
          />
        </div>

        {/* Property Summary */}
        <div className="property-summary">
          <h1 className="property-title">{formatPrice(property.price)}</h1>
          <p className="property-location">📍 {property.address}</p>

          <div className="property-features">
            <span className="feature-badge">
              🏠 {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </span>
            <span className="feature-badge">
              🛏️ {property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
            </span>
            <span className="feature-badge">
              📮 {property.postcode}
            </span>
          </div>

          <button
            className={`btn-add-favourite ${isFavourite ? 'active' : ''}`}
            onClick={() => addToFavourites(property)}
            disabled={isFavourite}
          >
            {isFavourite ? '❤️ Added to Favourites' : '🤍 Add to Favourites'}
          </button>
        </div>

        {/* Tabbed Content Section */}
        <div className="property-tabs">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            {/* Description Tab */}
            <TabPanel>
              <div className="tab-content">
                <h2>Property Description</h2>
                <p className="short-description">{property.description}</p>
                <div className="long-description">
                  <h3>Full Details</h3>
                  <p>{property.longDescription}</p>
                </div>

                <div className="property-details-grid">
                  <div className="detail-item">
                    <strong>Property Type:</strong>
                    <span>{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Bedrooms:</strong>
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Price:</strong>
                    <span>{formatPrice(property.price)}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Date Added:</strong>
                    <span>{new Date(property.dateAdded).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Postcode:</strong>
                    <span>{property.postcode}</span>
                  </div>
                </div>
              </div>
            </TabPanel>

            {/* Floor Plan Tab */}
            <TabPanel>
              <div className="tab-content">
                <h2>Floor Plan</h2>
                <div className="floor-plan">
                  <img src={property.floorPlan} alt="Floor plan" />
                </div>
              </div>
            </TabPanel>

            {/* Map Tab */}
            <TabPanel>
              <div className="tab-content">
                <h2>Location</h2>
                <p className="map-address">📍 {property.address}</p>
                <div className="map-container">
                  {/* Google Maps iframe */}
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.location.lat},${property.location.lng}&zoom=15`}
                  ></iframe>
                </div>
                <p className="map-note">
                  <small>Note: This map shows the approximate location of the property</small>
                </p>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PropertyPage;
