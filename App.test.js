// Test suite for core application logic

// Test 1: Property filtering by price range
describe('Property Search Logic', () => {
  test('filters properties by price range correctly', () => {
    const properties = [
      { id: 1, price: 200000, type: 'house', bedrooms: 3, postcode: 'BR1' },
      { id: 2, price: 500000, type: 'flat', bedrooms: 2, postcode: 'NW1' },
      { id: 3, price: 800000, type: 'house', bedrooms: 5, postcode: 'SW19' }
    ];

    const minPrice = 300000;
    const maxPrice = 700000;

    // Apply price filter
    const filtered = properties.filter(p =>
      p.price >= minPrice && p.price <= maxPrice
    );

    expect(filtered.length).toBe(1);
    expect(filtered[0].price).toBe(500000);
  });

  // Test 2: Property type filtering
  test('filters properties by type correctly', () => {
    const properties = [
      { id: 1, price: 200000, type: 'house', bedrooms: 3, postcode: 'BR1' },
      { id: 2, price: 500000, type: 'flat', bedrooms: 2, postcode: 'NW1' },
      { id: 3, price: 800000, type: 'house', bedrooms: 5, postcode: 'SW19' }
    ];

    const searchType = 'house';

    // Filter by type
    const filtered = properties.filter(p => p.type === searchType);

    expect(filtered.length).toBe(2);
    expect(filtered.every(p => p.type === 'house')).toBe(true);
  });

  // Test 3: Bedroom count filtering
  test('filters properties by minimum bedrooms correctly', () => {
    const properties = [
      { id: 1, price: 200000, type: 'house', bedrooms: 2, postcode: 'BR1' },
      { id: 2, price: 500000, type: 'flat', bedrooms: 3, postcode: 'NW1' },
      { id: 3, price: 800000, type: 'house', bedrooms: 5, postcode: 'SW19' }
    ];

    const minBedrooms = 3;

    // Filter by min bedrooms
    const filtered = properties.filter(p => p.bedrooms >= minBedrooms);

    expect(filtered.length).toBe(2);
    expect(filtered.every(p => p.bedrooms >= 3)).toBe(true);
  });

  // Test 4: Postcode filtering
  test('filters properties by postcode area correctly', () => {
    const properties = [
      { id: 1, price: 200000, type: 'house', bedrooms: 3, postcode: 'BR1' },
      { id: 2, price: 500000, type: 'flat', bedrooms: 2, postcode: 'NW1' },
      { id: 3, price: 320000, type: 'house', bedrooms: 2, postcode: 'BR1' }
    ];

    const searchPostcode = 'BR1';

    // Filter by postcode
    const filtered = properties.filter(p =>
      p.postcode.toUpperCase().startsWith(searchPostcode.toUpperCase())
    );

    expect(filtered.length).toBe(2);
    expect(filtered.every(p => p.postcode === 'BR1')).toBe(true);
  });
});

// Test 5: Favourites logic
describe('Favourites Management', () => {
  test('prevents duplicate properties in favourites', () => {
    const favourites = [
      { id: 1, price: 200000, address: '25 Oak Avenue' },
      { id: 2, price: 500000, address: 'Flat 12, Camden Heights' }
    ];

    const newProperty = { id: 1, price: 200000, address: '25 Oak Avenue' };

    // Check if property already exists
    const exists = favourites.find(fav => fav.id === newProperty.id);

    expect(exists).toBeDefined();
    expect(exists.id).toBe(1);

    // Verify we don't add duplicates
    if (!exists) {
      favourites.push(newProperty);
    }

    // Should still have only 2 items
    expect(favourites.length).toBe(2);
  });

  // Test 6: Remove from favourites
  test('removes property from favourites correctly', () => {
    let favourites = [
      { id: 1, price: 200000, address: '25 Oak Avenue' },
      { id: 2, price: 500000, address: 'Flat 12, Camden Heights' },
      { id: 3, price: 320000, address: '78 Green Lane' }
    ];

    const propertyIdToRemove = 2;

    // Remove the property
    favourites = favourites.filter(fav => fav.id !== propertyIdToRemove);

    expect(favourites.length).toBe(2);
    expect(favourites.find(f => f.id === 2)).toBeUndefined();
  });
});
