import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemCounter from '../components/ItemCounter';

describe('ItemCounter Component', () => {
  it('should render with initial count', () => {
    render(<ItemCounter count={1} max={10} setCount={() => {}} />);
    const input = screen.getByRole('spinbutton');
    expect(input.value).toBe('1');
  });

  it('should call setCount with incremented value when plus button is clicked', () => {
    const setCount = vi.fn();
    render(<ItemCounter count={1} max={10} setCount={setCount} />);
    
    // El primer botón es decremento (-), el segundo incremento (+)
    const buttons = screen.getAllByRole('button');
    const incrementBtn = buttons[1];
    
    fireEvent.click(incrementBtn);
    expect(setCount).toHaveBeenCalledWith(2);
  });

  it('should call setCount with decremented value when minus button is clicked', () => {
    const setCount = vi.fn();
    render(<ItemCounter count={5} max={10} setCount={setCount} />);
    
    const buttons = screen.getAllByRole('button');
    const decrementBtn = buttons[0];
    
    fireEvent.click(decrementBtn);
    expect(setCount).toHaveBeenCalledWith(4);
  });

  it('should disable decrement button when count is at min', () => {
    render(<ItemCounter count={1} min={1} max={10} setCount={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
  });

  it('should disable increment button when count is at max', () => {
    render(<ItemCounter count={10} max={10} setCount={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[1]).toBeDisabled();
  });

  it('should render action button only if buttonTitle is provided', () => {
    const { rerender } = render(<ItemCounter count={1} max={10} setCount={() => {}} />);
    // Solo deberían estar los botones de + y -
    expect(screen.getAllByRole('button')).toHaveLength(2);

    rerender(<ItemCounter count={1} max={10} setCount={() => {}} buttonTitle="Agregar" />);
    // Ahora debería haber 3 botones (+, -, y el de acción)
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('Agregar')).toBeInTheDocument();
  });
});
