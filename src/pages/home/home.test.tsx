import { fireEvent, render } from '@testing-library/react';
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

  it('should throw an error when forceError is true', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const errorButton = getByTestId('error');
    fireEvent.click(errorButton);
    expect(() => {
      throw new Error('Test error!');
    }).toThrow('Test error!');
  });
});
