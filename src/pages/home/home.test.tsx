import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './home';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('search', () => {
  it('should be defined', () => {
    expect(Home).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
  });
});
