import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PaginationAndPerPage from './pagination-and-per-page';

describe('search', () => {
  it('should be defined', () => {
    expect(PaginationAndPerPage).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <PaginationAndPerPage
        pageNumber={1}
        setToNextPageNumber={() => {}}
        setNewPerPage={() => {}}
      />
    );
  });
});
