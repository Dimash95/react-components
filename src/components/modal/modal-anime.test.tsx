import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ModalAnime from './modal-anime';

describe('search', () => {
  it('should be defined', () => {
    expect(ModalAnime).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <ModalAnime
        selectedAnimeItem={{
          title: '',
          image: '',
          largeImage: '',
          synopsis: '',
          id: 0,
        }}
        isModalOpen={false}
        closeModal={() => {}}
      />
    );
  });
});
