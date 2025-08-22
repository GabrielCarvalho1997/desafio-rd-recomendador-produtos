import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    children: 'Test Checkbox',
    checked: false,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização', () => {
    test('deve renderizar o checkbox com o texto fornecido', () => {
      render(<Checkbox {...defaultProps} />);

      expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
    });

    test('deve renderizar o checkbox desmarcado por padrão', () => {
      render(<Checkbox {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Interações', () => {
    test('deve alternar o estado checked quando clicado', () => {
      const mockOnChange = jest.fn();
      render(<Checkbox {...defaultProps} onChange={mockOnChange} />);

      const checkbox = screen.getByRole('checkbox');

      // Inicialmente desmarcado
      expect(checkbox).not.toBeChecked();

      // Clica para marcar
      fireEvent.click(checkbox);
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ checked: true })
        })
      );
    });
  });
});
