import React, { useState } from 'react';
import { DropdownList, NumberPicker, DatePicker } from 'react-widgets';
import './SearchForm.css';

// Search form component using React Widgets for enhanced UI
function SearchForm({ onSearch }) {
  // Form state for all search criteria
  const [formData, setFormData] = useState({
    type: 'any',
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    dateFrom: '',  // Changed to empty string for HTML5 date input
    dateTo: '',    // Changed to empty string for HTML5 date input
    postcode: ''
  });

  // Property type options for dropdown
  const propertyTypes = ['any', 'house', 'flat'];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass search criteria to parent component
    onSearch(formData);
  };

  // Reset form to initial state
  const handleReset = () => {
    setFormData({
      type: 'any',
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      maxBedrooms: null,
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Property Type Dropdown */}
      <div className="form-group">
        <label htmlFor="property-type">Property Type</label>
        <DropdownList
          id="property-type"
          data={propertyTypes}
          value={formData.type}
          onChange={(value) => setFormData({ ...formData, type: value })}
          placeholder="Select property type"
        />
      </div>

      {/* Price Range */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="min-price">Min Price (£)</label>
          <NumberPicker
            id="min-price"
            value={formData.minPrice}
            onChange={(value) => setFormData({ ...formData, minPrice: value })}
            min={0}
            step={10000}
            format={{ style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }}
            placeholder="Min price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="max-price">Max Price (£)</label>
          <NumberPicker
            id="max-price"
            value={formData.maxPrice}
            onChange={(value) => setFormData({ ...formData, maxPrice: value })}
            min={0}
            step={10000}
            format={{ style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }}
            placeholder="Max price"
          />
        </div>
      </div>

      {/* Bedroom Range */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="min-bedrooms">Min Bedrooms</label>
          <NumberPicker
            id="min-bedrooms"
            value={formData.minBedrooms}
            onChange={(value) => setFormData({ ...formData, minBedrooms: value })}
            min={0}
            max={10}
            placeholder="Min beds"
          />
        </div>

        <div className="form-group">
          <label htmlFor="max-bedrooms">Max Bedrooms</label>
          <NumberPicker
            id="max-bedrooms"
            value={formData.maxBedrooms}
            onChange={(value) => setFormData({ ...formData, maxBedrooms: value })}
            min={0}
            max={10}
            placeholder="Max beds"
          />
        </div>
      </div>

      {/* Date Range - Using HTML5 date inputs for better compatibility */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date-from">Date Added From</label>
          <input
            type="date"
            id="date-from"
            className="date-input"
            value={formData.dateFrom || ''}
            onChange={(e) => {
              console.log('Date From selected:', e.target.value);
              setFormData({ ...formData, dateFrom: e.target.value });
            }}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date-to">Date Added To</label>
          <input
            type="date"
            id="date-to"
            className="date-input"
            value={formData.dateTo || ''}
            onChange={(e) => {
              console.log('Date To selected:', e.target.value);
              setFormData({ ...formData, dateTo: e.target.value });
            }}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      {/* Postcode Area */}
      <div className="form-group">
        <label htmlFor="postcode">Postcode Area</label>
        <input
          type="text"
          id="postcode"
          className="postcode-input"
          value={formData.postcode}
          onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
          placeholder="e.g. BR1, NW1, SW19"
          maxLength="10"
        />
        <small>Enter first part of postcode (e.g., BR1, NW1)</small>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button type="submit" className="btn-search">Search Properties</button>
        <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}

export default SearchForm;
