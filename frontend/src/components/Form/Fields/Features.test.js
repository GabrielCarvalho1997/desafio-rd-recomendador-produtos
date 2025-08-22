import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Features from './Features';

describe('Features', () => {
  const defaultProps = {
    features: ['Gestão de leads e oportunidades', 'Rastreamento de interações com clientes de fluxos de trabalho de vendas', 'Rastreamento de interações com clientes'],
    selectedFeatures: [],
    onFeatureChange: jest.fn(),
    error: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização', () => {
    test('deve renderizar o título e descrição', () => {
      render(<Features {...defaultProps} />);

      expect(screen.getByText('Funcionalidades')).toBeInTheDocument();
      expect(screen.getByText('Escolha as funcionalidades que você precisa')).toBeInTheDocument();
    });

    test('deve renderizar todas as funcionalidades como checkboxes', () => {
      render(<Features {...defaultProps} />);

      expect(screen.getByText('Gestão de leads e oportunidades')).toBeInTheDocument();
      expect(screen.getByText('Rastreamento de interações com clientes de fluxos de trabalho de vendas')).toBeInTheDocument();
      expect(screen.getByText('Rastreamento de interações com clientes')).toBeInTheDocument();
    });
  });

  describe('Interações', () => {
    test('deve chamar onFeatureChange quando uma funcionalidade é selecionada', () => {
      render(<Features {...defaultProps} />);

      const checkbox = screen.getByText('Gestão de leads e oportunidades');
      fireEvent.click(checkbox);

      expect(defaultProps.onFeatureChange).toHaveBeenCalledWith(['Gestão de leads e oportunidades']);
    });
  });

  describe('Tratamento de erros', () => {
    test('deve exibir mensagem de erro quando fornecida', () => {
      const errorMessage = 'Selecione pelo menos uma funcionalidade';
      render(<Features {...defaultProps} error={errorMessage} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
