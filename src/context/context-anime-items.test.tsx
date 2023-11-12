import { describe, it, expect } from 'vitest';
import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Context, initialItemsContext } from './context-anime-items';

describe('ItemsContext', () => {
  it('should provide initial context values', () => {
    function TestComponent() {
      const contextValues = useContext(Context);

      return (
        <div data-testid="context-values">
          <div data-testid="searched-input-value">
            {contextValues.searchedInputValue}
          </div>
          <div data-testid="searched-anime-items">
            {contextValues.searchedAnimeItems.length}
          </div>
        </div>
      );
    }

    render(
      <MemoryRouter>
        <Context.Provider value={initialItemsContext}>
          <TestComponent />
        </Context.Provider>
      </MemoryRouter>
    );

    const contextValuesElement = document.querySelector(
      '[data-testid="context-values"]'
    );
    const searchedInputValueElement = document.querySelector(
      '[data-testid="searched-input-value"]'
    );
    const searchedAnimeItemsElement = document.querySelector(
      '[data-testid="searched-anime-items"]'
    );

    expect(contextValuesElement).not.toBeNull();
    expect(searchedInputValueElement?.textContent).toBe('');
    expect(searchedAnimeItemsElement?.textContent).toBe('0');
  });

  it('should update context values when using context functions', () => {
    function TestComponent() {
      const contextValues = useContext(Context);

      // Simulate calling context functions
      contextValues.setSearchedInputValue('Cowboy Bebop');
      contextValues.setSearchedAnimeItems([
        {
          title: 'Cowboy Bebop',
          id: 1,
          image: 'img-url',
          largeImage: 'largeImg-url',
          synopsis: 'desc',
        },
      ]);

      return (
        <div data-testid="context-values">
          <div data-testid="searched-input-value">
            {contextValues.searchedInputValue}
          </div>
          <div data-testid="searched-anime-items">
            {contextValues.searchedAnimeItems.length}
          </div>
        </div>
      );
    }

    render(
      <MemoryRouter>
        <Context.Provider value={initialItemsContext}>
          <TestComponent />
        </Context.Provider>
      </MemoryRouter>
    );

    const searchedInputValueElement = document.querySelector(
      '[data-testid="searched-input-value"]'
    );
    const searchedAnimeItemsElement = document.querySelector(
      '[data-testid="searched-anime-items"]'
    );

    expect(searchedInputValueElement?.textContent).toBe('Cowboy Bebop');
    expect(searchedAnimeItemsElement?.textContent).toBe('1');
  });
});
