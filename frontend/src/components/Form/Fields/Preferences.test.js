import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Preferences from './Preferences';

describe('Preferences', () => {
  const defaultProps = {
    preferences: ['Integração fácil com ferramentas de e-mail', 'Relatórios avançados de desempenho de vendas de funis de vendas', 'Relatórios avançados de desempenho de vendas'],
    selectedPreferences: [],
    onPreferenceChange: jest.fn(),
    error: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização', () => {
    test('deve renderizar o título e descrição', () => {
      render(<Preferences {...defaultProps} />);

      expect(screen.getByText('Preferências')).toBeInTheDocument();
      expect(screen.getByText('Selecione as áreas de interesse para seu negócio')).toBeInTheDocument();
    });

    test('deve renderizar todas as preferências como checkboxes', () => {
      render(<Preferences {...defaultProps} />);

      expect(screen.getByText('Integração fácil com ferramentas de e-mail')).toBeInTheDocument();
      expect(screen.getByText('Relatórios avançados de desempenho de vendas de funis de vendas')).toBeInTheDocument();
      expect(screen.getByText('Relatórios avançados de desempenho de vendas')).toBeInTheDocument();
    });
  });

  describe('Interações', () => {
    test('deve chamar onPreferenceChange quando uma preferência é selecionada', () => {
      render(<Preferences {...defaultProps} />);

      const checkbox = screen.getByText('Integração fácil com ferramentas de e-mail');
      fireEvent.click(checkbox);

      expect(defaultProps.onPreferenceChange).toHaveBeenCalledWith(['Integração fácil com ferramentas de e-mail']);
    });
  });

  describe('Tratamento de erros', () => {
    test('deve exibir mensagem de erro quando fornecida', () => {
      const errorMessage = 'Selecione pelo menos uma preferência';
      render(<Preferences {...defaultProps} error={errorMessage} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
