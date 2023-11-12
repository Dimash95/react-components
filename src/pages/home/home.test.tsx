import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from './home';

describe('search', () => {
  it('should be defined', () => {
    expect(Home).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });

  it('should throw an error when the error button is clicked', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const errorButton = screen.getByTestId('error');
    const clickWithErrorHandling = () => fireEvent.click(errorButton);
    expect(clickWithErrorHandling).toThrow('Test error!');
  });

  it('should open and close modal correctly', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const modalLoading = screen.queryByTestId('modal-loading');
      if (modalLoading) {
        return true;
      }
      return false;
    });

    const closeModalButton = screen.getByTestId('close-modal');
    fireEvent.click(closeModalButton);

    expect(screen.queryByTestId('modal')).toBeNull();
  });

  it('should update search input value on input change', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const inputElement = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'test' } });
  });
});
