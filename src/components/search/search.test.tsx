import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Search from './search';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('search', () => {
  it('should be defined', () => {
    expect(Search).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
  });

  it('should update input value when searchedInputValue changes', () => {
    // Arrange
    const { rerender } = render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const inputElement = screen.getByTestId('search-input') as HTMLInputElement;

    // Act
    fireEvent.change(inputElement, { target: { value: 'test' } });

    // Assert
    rerender(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(inputElement.value).toBe('test');
  });
});
