import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PaginationAndPerPage from './pagination-and-per-page';

describe('PaginationAndPerPage', () => {
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

  it('should call click changeToNextPageNumber', () => {
    const mockChangeToNextPageNumber = vi.fn();

    render(
      <PaginationAndPerPage
        pageNumber={2}
        setToNextPageNumber={mockChangeToNextPageNumber}
        setNewPerPage={() => {}}
      />
    );

    const button = screen.getByTestId('page-number');
    button.click();
    expect(mockChangeToNextPageNumber).toBeCalledTimes(1);
  });

  it('should call click updatePerPage', () => {
    const mockUpdatePerPage = vi.fn();

    render(
      <PaginationAndPerPage
        pageNumber={1}
        setToNextPageNumber={() => {}}
        setNewPerPage={mockUpdatePerPage}
      />
    );

    const button = screen.getByTestId('pagination-per-page');
    button.click();
    expect(mockUpdatePerPage).toBeCalledTimes(1);
  });

  it('should not call setToNextPageNumber when clicking Previous with pageNumber 1', () => {
    const mockChangeToNextPageNumber = vi.fn();

    render(
      <PaginationAndPerPage
        pageNumber={1}
        setToNextPageNumber={mockChangeToNextPageNumber}
        setNewPerPage={() => {}}
      />
    );

    const button = screen.getByTestId('page-number');
    fireEvent.click(button);
    expect(mockChangeToNextPageNumber).not.toBeCalled();
  });

  it('should call setPerPageValue when changing input value', () => {
    render(
      <PaginationAndPerPage
        pageNumber={1}
        setToNextPageNumber={() => {}}
        setNewPerPage={() => {}}
      />
    );

    const input = screen.getByTestId('per-page-value') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '20' } });
    expect(input.value).toBe('20');
  });
});
