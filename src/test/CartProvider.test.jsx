import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartProvider from '../context/CartProvider';

// Mock de react-hot-toast para evitar errores en tests
vi.mock('react-hot-toast', () => ({
  default: vi.fn(),
}));

const TestComponent = () => {
  const { addItem, cartItems, removeItem, clearCart, getTotalPrice, updateQuantity } = useContext(CartContext);
  
  return (
    <div>
      <div data-testid="total">{getTotalPrice()}</div>
      <div data-testid="count">{cartItems.length}</div>
      <button onClick={() => addItem({ id: 1, name: 'Product 1', price: 100 }, 2)}>Add Item</button>
      <button onClick={() => updateQuantity(1, 5)}>Update Quantity</button>
      <button onClick={() => removeItem(1)}>Remove Item</button>
      <button onClick={clearCart}>Clear Cart</button>
      {cartItems.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          {item.name} - {item.quantity}
        </div>
      ))}
    </div>
  );
};

describe('CartProvider', () => {
  it('should start with an empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('should add items to the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add Item'));
    
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('item-1').textContent).toContain('Product 1 - 2');
    expect(screen.getByTestId('total').textContent).toBe('200');
  });

  it('should update item quantity if added again', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Add Item'));
    
    expect(screen.getByTestId('count').textContent).toBe('1'); // Sigue habiendo 1 item único
    expect(screen.getByTestId('item-1').textContent).toContain('Product 1 - 4');
  });

  it('should update quantity using updateQuantity function', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Update Quantity'));
    
    expect(screen.getByTestId('item-1').textContent).toContain('Product 1 - 5');
  });

  it('should remove items from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Remove Item'));
    
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('should clear the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    fireEvent.click(screen.getByText('Add Item'));
    fireEvent.click(screen.getByText('Clear Cart'));
    
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
});
