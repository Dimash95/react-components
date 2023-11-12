import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from './error-boundary';

describe('search', () => {
  it('should be defined', () => {
    expect(ErrorBoundary).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary />
      </MemoryRouter>
    );
  });
});
