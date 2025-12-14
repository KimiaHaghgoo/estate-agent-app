# Estate Agent Property Search Application

A responsive React-based property search application inspired by rightmove.co.uk. This single-page application allows users to search for properties using multiple criteria, view detailed property information with image galleries, and manage their favourite listings.

## Features Overview

This application implements a comprehensive property search system with the following key features:

### Property Search
- Filter by property type (house, flat, or any)
- Set minimum and maximum price range
- Specify bedroom requirements (min and max)
- Filter by date added (single date or date range)
- Search by postcode area (e.g., BR1, NW1, SW19)
- All search criteria work independently or in combination

### Property Display
- Responsive grid layout showing property cards
- Each card shows property image, price, address, and description
- Click through to view full property details
- Visual indicators for favourited properties

### Property Details Page
- Interactive image gallery with 6-8 high-quality images per property
- Thumbnail navigation and full-screen viewing
- Tabbed interface showing:
  - Full description and property features
  - Floor plan visualization
  - Google Maps integration for location

### Favourites Management
- Add properties to favourites via button click or drag-and-drop
- Remove properties individually or clear all at once
- Drag properties out of the favourites list to remove them
- Automatic duplicate prevention
- Real-time updates to favourites count

## Technical Stack

- **React 19**: Core framework
- **React Router DOM**: Client-side routing
- **React Widgets**: Enhanced form components
- **React DnD**: Drag and drop functionality
- **React Tabs**: Tabbed interface components
- **React Image Gallery**: Photo gallery component
- **JEST & React Testing Library**: Unit testing

## Getting Started

### Installation

```bash
# Install all dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Running Tests

```bash
# Run test suite
npm test

# Run tests without watch mode
npm test -- --watchAll=false
```

### Building for Production

```bash
# Create optimized production build
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── SearchPage.js          # Main search interface
│   ├── SearchForm.js           # Search form with React widgets
│   ├── ResultsList.js          # Property cards grid display
│   ├── FavouritesList.js       # Favourites sidebar
│   └── PropertyPage.js         # Individual property details
├── data/
│   └── properties.json         # Property data (7 properties)
├── App.js                      # Main app component
└── *.css                       # Component styles
```

## Key Implementation Details

### Search Functionality

The search system filters properties based on user-selected criteria. Multiple filters can be applied simultaneously:

- Property type filtering
- Price range filtering (inclusive)
- Bedroom count filtering (inclusive)
- Date range filtering
- Postcode area matching (case-insensitive prefix match)

### Responsive Design

The application adapts to different screen sizes:
- **Desktop (>1024px)**: Multi-column grid with sticky sidebar
- **Tablet (768-1024px)**: Two-column grid, favourites repositioned
- **Mobile (<768px)**: Single column layout, optimized touch targets

### Security Measures

- Content Security Policy (CSP) headers in HTML
- React's built-in XSS protection through JSX
- Secure external resource loading

### Testing

9 comprehensive tests covering:
- Component rendering
- Search filtering logic
- Form interactions
- Favourites management
- Duplicate prevention

## Data Structure

Each property includes:
- Unique ID
- Type (house/flat)
- Price
- Number of bedrooms
- Date added
- Postcode area
- Full address
- Short and long descriptions
- 6-8 property images
- Floor plan
- GPS coordinates for mapping

## Browser Compatibility

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Assignment Compliance

This project meets all requirements for the Advanced Client-Side Web Development coursework:

- ✅ 7 diverse properties in JSON format
- ✅ React UI widgets on all form elements
- ✅ Multi-criteria search functionality
- ✅ Effective results display
- ✅ Image gallery (6-8 images per property)
- ✅ Tabbed property details
- ✅ Add to favourites (button + drag/drop)
- ✅ Remove from favourites (button + drag out)
- ✅ Favourites list display
- ✅ Responsive design with media queries
- ✅ Professional aesthetics
- ✅ Client-side security (CSP)
- ✅ Code quality and comments
- ✅ JEST testing suite (9 tests)

## Known Limitations

- Favourites are session-based (not persisted to localStorage)
- No backend API integration
- Limited to 7 sample properties
- Google Maps requires API key for production use

## Future Enhancements

- Local storage for persistent favourites
- User authentication and saved searches
- Property comparison feature
- Email alerts for new listings
- Virtual tour integration
- Mortgage calculator

## License

Created for academic purposes as part of the University of Westminster's Advanced Client-Side Web Development course (5COSC026W).
