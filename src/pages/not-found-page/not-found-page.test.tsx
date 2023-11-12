import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NotFoundPage from './not-found-page';

describe('search', () => {
  it('should be defined', () => {
    expect(NotFoundPage).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
  });
});
