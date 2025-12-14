import React from 'react';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import './ResultsList.css';

// Individual property card component with drag functionality
function PropertyCard({ property, addToFavourites, isFavourite }) {
  // Set up drag functionality for this property
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Format price with commas
  const formatPrice = (price) => {
    return '£' + price.toLocaleString('en-GB');
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Property image */}
      <div className="property-image">
        <img src={property.images[0]} alt={property.address} />
        {isFavourite && <span className="favourite-badge">❤️ Favourite</span>}
      </div>

      {/* Property details */}
      <div className="property-details">
        <h3 className="property-price">{formatPrice(property.price)}</h3>
        <p className="property-address">{property.address}</p>
        <p className="property-description">{property.description}</p>

        <div className="property-meta">
          <span className="meta-item">
            <strong>Type:</strong> {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
          <span className="meta-item">
            <strong>Beds:</strong> {property.bedrooms}
          </span>
          <span className="meta-item">
            <strong>Added:</strong> {formatDate(property.dateAdded)}
          </span>
        </div>

        {/* Action buttons */}
        <div className="property-actions">
          <Link to={`/property/${property.id}`} className="btn-view">
            View Details
          </Link>
          <button
            className={`btn-favourite ${isFavourite ? 'active' : ''}`}
            onClick={() => addToFavourites(property)}
            disabled={isFavourite}
          >
            {isFavourite ? '❤️ Favourited' : '🤍 Add to Favourites'}
          </button>
        </div>
      </div>

      {/* Drag hint */}
      <div className="drag-hint">
        <small>💡 Drag to favourites →</small>
      </div>
    </div>
  );
}

// Results list component that displays all matching properties
function ResultsList({ properties, addToFavourites, favourites }) {
  return (
    <div className="results-list">
      {properties.map((property) => {
        // Check if this property is already in favourites
        const isFavourite = favourites.some(fav => fav.id === property.id);

        return (
          <PropertyCard
            key={property.id}
            property={property}
            addToFavourites={addToFavourites}
            isFavourite={isFavourite}
          />
        );
      })}
    </div>
  );
}

export default ResultsList;
