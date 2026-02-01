import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router';
import CheckoutView from './CheckoutView';

describe('CheckoutView Component', () => {
  const mockCartItems = [
    { id: 1, name: 'Prod 1', price: 100, quantity: 1 }
  ];
  const mockGetTotalPrice = () => 100;
  const mockOnCreateOrder = vi.fn();

  const renderWithRouter = (props) => {
    return render(
      <BrowserRouter>
        <CheckoutView {...props} />
      </BrowserRouter>
    );
  };

  it('should show empty message if no items in cart', () => {
    renderWithRouter({ 
      cartItems: [], 
      getTotalPrice: () => 0, 
      onCreateOrder: mockOnCreateOrder 
    });
    
    expect(screen.getByText('No hay productos para procesar')).toBeInTheDocument();
  });

  it('should render form if there are items in cart', () => {
    renderWithRouter({ 
      cartItems: mockCartItems, 
      getTotalPrice: mockGetTotalPrice, 
      onCreateOrder: mockOnCreateOrder 
    });
    
    expect(screen.getByLabelText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmar Email')).toBeInTheDocument();
  });

  it('should show alert if emails do not match', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderWithRouter({ 
      cartItems: mockCartItems, 
      getTotalPrice: mockGetTotalPrice, 
      onCreateOrder: mockOnCreateOrder 
    });

    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText('Confirmar Email'), { target: { value: 'otro@test.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '123456' } });

    fireEvent.submit(screen.getByRole('button', { name: /Confirmar y Crear Orden/i }));

    expect(alertSpy).toHaveBeenCalledWith("Los correos electrónicos no coinciden");
    expect(mockOnCreateOrder).not.toHaveBeenCalled();
    
    alertSpy.mockRestore();
  });

  it('should call onCreateOrder with form data when valid', () => {
    renderWithRouter({ 
      cartItems: mockCartItems, 
      getTotalPrice: mockGetTotalPrice, 
      onCreateOrder: mockOnCreateOrder 
    });

    fireEvent.change(screen.getByLabelText('Nombre Completo'), { target: { value: 'Juan Pérez' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText('Confirmar Email'), { target: { value: 'juan@test.com' } });
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '123456789' } });

    fireEvent.submit(screen.getByRole('button', { name: /Confirmar y Crear Orden/i }));

    expect(mockOnCreateOrder).toHaveBeenCalledWith({
      name: 'Juan Pérez',
      email: 'juan@test.com',
      emailConfirm: 'juan@test.com',
      phone: '123456789'
    });
  });

  it('should show loading state on button', () => {
    renderWithRouter({ 
      cartItems: mockCartItems, 
      getTotalPrice: mockGetTotalPrice, 
      onCreateOrder: mockOnCreateOrder,
      isLoading: true
    });

    expect(screen.getByText('Procesando...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Procesando.../i })).toBeDisabled();
  });
});
