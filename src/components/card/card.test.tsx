import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Context } from '../../context/context-anime-items';
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
    render(
      <MemoryRouter>
        <Context.Provider
          value={{
            searchedInputValue: '',
            setSearchedInputValue: () => {},
            searchedAnimeItems: [
              {
                title: 'title',
                image: 'image-url',
                largeImage: 'largeImage-url',
                synopsis: 'desc',
                id: 1,
              },
            ],
            setSearchedAnimeItems: () => {},
          }}
        >
          <Card showAnimeById={() => {}} />
        </Context.Provider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('title');
  });

  it('should call click ShowAnimeById', () => {
    const mockShowAnimeId = vi.fn();

    render(
      <MemoryRouter>
        <Context.Provider
          value={{
            searchedInputValue: '',
            setSearchedInputValue: () => {},
            searchedAnimeItems: [
              {
                title: 'title',
                image: 'image-url',
                largeImage: 'largeImage-url',
                synopsis: 'desc',
                id: 1,
              },
            ],
            setSearchedAnimeItems: () => {},
          }}
        >
          <Card showAnimeById={mockShowAnimeId} />
        </Context.Provider>
      </MemoryRouter>
    );

    const card = screen.getByTestId('card-click');
    card.click();
    expect(mockShowAnimeId).toHaveBeenCalledTimes(1);
  });
});
