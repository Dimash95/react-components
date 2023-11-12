import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Search from './search';

describe('search', () => {
  it('should be defined', () => {
    expect(Search).toBeDefined();
  });

  it('should render correctly', () => {
    render(<Search handleSearch={() => ({})} />);
  });

  it('should call click handleSearch', () => {
    const mockHandleSearch = vi.fn();

    render(<Search handleSearch={mockHandleSearch} />);

    const search = screen.getByTestId('search');
    search.click();
    expect(mockHandleSearch).toHaveBeenCalledTimes(1);
  });

  it('should update input value when searchedInputValue changes', () => {
    // Arrange
    const { rerender } = render(<Search handleSearch={() => {}} />);
    const inputElement = screen.getByTestId('search-input') as HTMLInputElement;

    // Act
    fireEvent.change(inputElement, { target: { value: 'test' } });

    // Assert
    rerender(<Search handleSearch={() => {}} />); // Re-render to reflect the state change
    expect(inputElement.value).toBe('test');
  });
});
