import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Search from './search';

describe('search', () => {
  it('should be defined', () => {
    expect(Search).toBeDefined();
  });

  it('should render correctly', () => {
    render(<Search handleSearch={() => ({})} />);
  });
});
