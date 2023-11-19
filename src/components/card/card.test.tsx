import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Card from './card';

describe('search', () => {
  it('should be defined', () => {
    expect(Card).toBeDefined();
  });

  it('should render correctly', () => {
    render(<Card showAnimeById={() => {}} />);
  });

  it('should call click ShowAnimeById', () => {
    const mockShowAnimeId = vi.fn();

    const animeItems = [
      {
        title: 'Anime Title',
        image: 'https://example.com/image.jpg',
        largeImage: 'https://example.com/large_image.jpg',
        synopsis: 'Synopsis of the anime',
        id: 1,
      },
    ];

    render(
      <Card searchedAnimeItems={animeItems} showAnimeById={mockShowAnimeId} />
    );

    const card = screen.getByTestId('card-click');
    card.click();
    expect(mockShowAnimeId).toHaveBeenCalledTimes(1);
  });
});
