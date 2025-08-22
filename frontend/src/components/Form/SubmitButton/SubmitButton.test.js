import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SubmitButton from './SubmitButton';

describe('SubmitButton', () => {
  const defaultProps = {
    text: 'Enviar Formulário',
  };

  describe('Renderização', () => {
    test('deve renderizar o botão com o texto fornecido', () => {
      render(<SubmitButton {...defaultProps} />);

      const button = screen.getByRole('button', { name: 'Enviar Formulário' });
      expect(button).toBeInTheDocument();
    });
  });
});
