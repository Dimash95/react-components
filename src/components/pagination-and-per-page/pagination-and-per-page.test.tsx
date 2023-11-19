import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaginationAndPerPage from './pagination-and-per-page';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('PaginationAndPerPage', () => {
  it('should be defined', () => {
    expect(PaginationAndPerPage).toBeDefined();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <PaginationAndPerPage pageNumber={1} setToNextPageNumber={() => {}} />
      </Provider>
    );
  });

  it('should call click changeToNextPageNumber', () => {
    const mockChangeToNextPageNumber = vi.fn();

    render(
      <Provider store={store}>
        <PaginationAndPerPage
          pageNumber={2}
          setToNextPageNumber={mockChangeToNextPageNumber}
        />
      </Provider>
    );

    const button = screen.getByTestId('page-number');
    button.click();
    expect(mockChangeToNextPageNumber).toBeCalledTimes(1);
  });

  it('should not call setToNextPageNumber when clicking Previous with pageNumber 1', () => {
    const mockChangeToNextPageNumber = vi.fn();

    render(
      <Provider store={store}>
        <PaginationAndPerPage
          pageNumber={1}
          setToNextPageNumber={mockChangeToNextPageNumber}
        />
      </Provider>
    );

    const button = screen.getByTestId('page-number');
    fireEvent.click(button);
    expect(mockChangeToNextPageNumber).not.toBeCalled();
  });

  it('should call setPerPageValue when changing input value', () => {
    render(
      <Provider store={store}>
        <PaginationAndPerPage pageNumber={1} setToNextPageNumber={() => {}} />
      </Provider>
    );

    const input = screen.getByTestId('per-page-value') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '20' } });
    expect(input.value).toBe('20');
  });
});
