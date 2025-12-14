import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import './FavouritesList.css';

// Individual favourite item with drag-out functionality
function FavouriteItem({ property, removeFromFavourites }) {
  // Set up drag functionality for dragging OUT of favourites
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'favourite-item',
    item: { propertyId: property.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const formatPrice = (price) => {
    return '£' + price.toLocaleString('en-GB');
  };

  return (
    <div
      ref={drag}
      className={`favourite-item ${isDragging ? 'dragging-out' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <img src={property.images[0]} alt={property.address} className="fav-thumb" />
      <div className="fav-info">
        <Link to={`/property/${property.id}`} className="fav-address">
          {property.address}
        </Link>
        <p className="fav-price">{formatPrice(property.price)}</p>
      </div>
      <button
        className="btn-remove"
        onClick={() => removeFromFavourites(property.id)}
        title="Remove from favourites"
      >
        ✕
      </button>
    </div>
  );
}

// Main favourites list component
function FavouritesList({ favourites, removeFromFavourites, clearFavourites }) {
  // Set up drop zone for adding properties to favourites
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => {
      // Add the dropped property to favourites
      // The actual function is passed from parent
      return { name: 'FavouritesList' };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Listen for items being dragged out and dropped
  const [{ isOverRemove }, dropRemove] = useDrop(() => ({
    accept: 'favourite-item',
    drop: (item) => {
      // Remove this item from favourites
      removeFromFavourites(item.propertyId);
    },
    collect: (monitor) => ({
      isOverRemove: monitor.isOver(),
    }),
  }));

  return (
    <div className="favourites-container">
      <h2>My Favourites</h2>

      {/* Drop zone area */}
      <div
        ref={drop}
        className={`favourites-drop-area ${isOver ? 'drag-over' : ''}`}
      >
        {favourites.length === 0 ? (
          <div className="empty-favourites">
            <p>No favourites yet</p>
            <small>Drag properties here or click the heart button</small>
          </div>
        ) : (
          <>
            <div className="favourites-header">
              <span className="fav-count">{favourites.length} {favourites.length === 1 ? 'property' : 'properties'}</span>
              <button className="btn-clear" onClick={clearFavourites}>
                Clear All
              </button>
            </div>

            <div className="favourites-list">
              {favourites.map((property) => (
                <FavouriteItem
                  key={property.id}
                  property={property}
                  removeFromFavourites={removeFromFavourites}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Remove drop zone - only show when there are favourites */}
      {favourites.length > 0 && (
        <div
          ref={dropRemove}
          className={`remove-zone ${isOverRemove ? 'drag-over' : ''}`}
        >
          <p>🗑️ Drag here to remove</p>
        </div>
      )}

      <div className="favourites-hint">
        <small>💡 Tip: Drag items out to remove them</small>
      </div>
    </div>
  );
}

export default FavouritesList;
