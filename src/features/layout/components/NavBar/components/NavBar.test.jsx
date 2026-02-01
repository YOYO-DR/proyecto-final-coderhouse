import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import { CartContext } from '../../../../../context/CartContext';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  const mockGetQuantity = vi.fn().mockReturnValue(0);
  const mockCategories = [
    { id: '1', slug: 'teclados', name: 'Teclados' },
    { id: '2', slug: 'mouse', name: 'Mouse' },
    { id: '3', slug: 'auriculares', name: 'Auriculares' },
  ];

  const renderWithProviders = (quantity = 0, categories = mockCategories) => {
    mockGetQuantity.mockReturnValue(quantity);
    return render(
      <BrowserRouter>
        <CartContext.Provider value={{ getQuantity: mockGetQuantity }}>
          <NavBar categories={categories} isLoading={false} />
        </CartContext.Provider>
      </BrowserRouter>
    );
  };

  it('should render the brand name', () => {
    renderWithProviders();
    expect(screen.getByText(/Mi Ecommerce/i)).toBeInTheDocument();
  });

  it('should render all categories', () => {
    renderWithProviders();
    // Reviso algunas categorías asumiendo que están hardcodeadas o vienen de un listado interno
    expect(screen.getByText(/Teclados/i)).toBeInTheDocument();
    expect(screen.getByText(/Mouse/i)).toBeInTheDocument();
    expect(screen.getByText(/Auriculares/i)).toBeInTheDocument();
  });

  it('should show cart badge only when quantity > 0', () => {
    const { rerender } = renderWithProviders(0);
    // El badge no debería existir o no ser visible. 
    // Depende de cómo esté implementado el CartWidget.
    expect(screen.queryByText('0')).not.toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <CartContext.Provider value={{ getQuantity: () => 5 }}>
          <NavBar categories={mockCategories} isLoading={false} />
        </CartContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
