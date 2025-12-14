import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

// Test 1: SearchForm renders all form elements correctly
describe('SearchForm Component', () => {
  test('renders all search form fields', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    // Check if all main form elements are present
    expect(screen.getByText('Property Type')).toBeInTheDocument();
    expect(screen.getByText('Min Price (£)')).toBeInTheDocument();
    expect(screen.getByText('Max Price (£)')).toBeInTheDocument();
    expect(screen.getByText('Min Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Date Added From')).toBeInTheDocument();
    expect(screen.getByText('Date Added To')).toBeInTheDocument();
    expect(screen.getByText('Postcode Area')).toBeInTheDocument();
  });

  // Test 2: Search button triggers onSearch callback
  test('calls onSearch when search button is clicked', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole('button', { name: /search properties/i });
    fireEvent.click(searchButton);

    // Verify the onSearch callback was called
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  // Test 3: Reset button clears the form
  test('reset button clears form fields', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    // Get the postcode input and type something
    const postcodeInput = screen.getByPlaceholderText(/e.g. BR1, NW1, SW19/i);
    fireEvent.change(postcodeInput, { target: { value: 'BR1' } });

    // Verify value was set
    expect(postcodeInput.value).toBe('BR1');

    // Click reset button
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    // Verify field was cleared
    expect(postcodeInput.value).toBe('');
  });
});
