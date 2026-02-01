import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter, useParams } from 'react-router';
import ItemListContainer from './ItemListContainer';
import { getProducts, getProductByCategory } from '../../firebase/db';

// Mock de firebase/db
vi.mock('../../firebase/db', () => ({
  getProducts: vi.fn(),
  getProductByCategory: vi.fn(),
}));

// Mock de react-router useParams
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('ItemListContainer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = () => {
    return render(
      <BrowserRouter suppressHydrationWarning>
        <ItemListContainer />
      </BrowserRouter>
    );
  };

  it('should show loading state initially', async () => {
    getProducts.mockReturnValue(new Promise(() => {})); 
    useParams.mockReturnValue({ slug: undefined });
    
    renderWithRouter();
    
    expect(screen.getByRole('status')).toBeInTheDocument(); 
  });

  it('should render products after loading', async () => {
    const mockProducts = [
      { id: 1, name: 'Prod 1', price: 100, category: 'cat1', url: 'img1.jpg' }
    ];
    getProducts.mockResolvedValue(mockProducts);
    useParams.mockReturnValue({ slug: undefined });
    
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText('Prod 1')).toBeInTheDocument();
    });
  });

  it('should filter products by category when slug param is present', async () => {
    getProductByCategory.mockResolvedValue([]);
    useParams.mockReturnValue({ slug: 'electronics' });
    
    renderWithRouter();

    await waitFor(() => {
      expect(getProductByCategory).toHaveBeenCalledWith('electronics');
    });
  });
});
