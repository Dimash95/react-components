import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';
import { Item } from '../../entities/item';
import Card from './card';

describe('search', () => {
  it('should be defined', () => {
    expect(Card).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Card showAnimeById={() => {}} />
      </MemoryRouter>
    );
  });

  it('should render correctly with items', () => {
    const Context = React.createContext({
      searchedAnimeItems: [] as Item[],
    });
    render(
      <MemoryRouter>
        <Context.Provider
          value={{
            searchedAnimeItems: [
              {
                title: 'title',
                image: 'image-url',
                largeImage: 'largeImage-url',
                synopsis: 'desc',
                id: 1,
              },
            ],
          }}
        >
          <Card showAnimeById={() => {}} />
        </Context.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('title')).toBeInTheDocument();
  });
});
