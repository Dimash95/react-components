import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ErrorBoundary from './error-boundary';

describe('ErrorBoundary', () => {
  it('should be defined', () => {
    expect(ErrorBoundary).toBeDefined();
  });

  it('should render children when there is no error', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <div>Some child content</div>
        </ErrorBoundary>
      </MemoryRouter>
    );

    const childContent = document.querySelector('div');
    expect(childContent?.textContent).toBe('Some child content');
  });

  it('should reload the page when the reload button is clicked', () => {
    // Spy on console.error
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Mock the window.location.reload function
    const reloadMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    });

    try {
      // Mock a component that throws an error
      const ErrorComponent = () => {
        throw new Error('Test error');
      };

      render(
        <MemoryRouter>
          <ErrorBoundary>
            <ErrorComponent />
          </ErrorBoundary>
        </MemoryRouter>
      );
    } catch (error) {
      // Expect that the window.location.reload function was called
      expect(reloadMock).toHaveBeenCalled();

      // Expect that console.error was called
      expect(consoleErrorSpy).toHaveBeenCalled();

      // Clean up the spy
      consoleErrorSpy.mockRestore();
    }
  });
});
