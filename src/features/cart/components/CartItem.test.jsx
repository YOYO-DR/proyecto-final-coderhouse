import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartContext } from '../../../context/CartContext';
import CartItem from './CartItem';

describe('CartItem Component', () => {
  const mockItem = {
    id: 1,
    name: 'Teclado Mecánico',
    price: 50,
    quantity: 2,
    url: 'http://image.com/keyboard.jpg',
    stock: 10
  };

  const mockRemoveItem = vi.fn();
  const mockUpdateQuantity = vi.fn();

  const renderWithContext = (item) => {
    return render(
      <CartContext.Provider value={{ updateQuantity: mockUpdateQuantity }}>
        <CartItem item={item} removeItem={mockRemoveItem} />
      </CartContext.Provider>
    );
  };

  it('should render item details correctly', () => {
    renderWithContext(mockItem);
    
    expect(screen.getByText('Teclado Mecánico')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument(); // 50 * 2
    expect(screen.getByText('$50 c/u')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockItem.url);
  });

  it('should call removeItem when eliminate button is clicked', () => {
    renderWithContext(mockItem);
    
    const removeBtn = screen.getByText('Eliminar');
    fireEvent.click(removeBtn);
    
    expect(mockRemoveItem).toHaveBeenCalledWith(mockItem.id);
  });

  it('should call updateQuantity when counter buttons are clicked', () => {
    renderWithContext(mockItem);
    
    const buttons = screen.getAllByRole('button');
    const incrementBtn = buttons[1]; // El segundo botón es "+"
    
    fireEvent.click(incrementBtn);
    
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.id, 3);
  });
});
