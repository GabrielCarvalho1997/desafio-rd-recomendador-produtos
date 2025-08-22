import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import RecommendationType from './RecommendationType';

describe('RecommendationType', () => {
  const defaultProps = {
    onRecommendationTypeChange: jest.fn(),
    selectedType: '',
    error: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Renderização', () => {
    test('deve renderizar o título e descrição', () => {
      render(<RecommendationType {...defaultProps} />);

      expect(screen.getByText('Tipo de Recomendação')).toBeInTheDocument();
      expect(screen.getByText('Escolha como você quer receber as recomendações')).toBeInTheDocument();
    });

    test('deve renderizar as duas opções de recomendação', () => {
      render(<RecommendationType {...defaultProps} />);

      expect(screen.getByText('Produto Único')).toBeInTheDocument();
      expect(screen.getByText('Múltiplos Produtos')).toBeInTheDocument();
    });
  });

  describe('Seleção de opções', () => {
    test('deve marcar SingleProduct quando selectedType é SingleProduct', () => {
      render(<RecommendationType {...defaultProps} selectedType="SingleProduct" />);

      const singleProductRadio = screen.getByDisplayValue('SingleProduct');
      const multipleProductsRadio = screen.getByDisplayValue('MultipleProducts');

      expect(singleProductRadio).toBeChecked();
      expect(multipleProductsRadio).not.toBeChecked();
    });

    test('deve marcar MultipleProducts quando selectedType é MultipleProducts', () => {
      render(<RecommendationType {...defaultProps} selectedType="MultipleProducts" />);

      const singleProductRadio = screen.getByDisplayValue('SingleProduct');
      const multipleProductsRadio = screen.getByDisplayValue('MultipleProducts');

      expect(singleProductRadio).not.toBeChecked();
      expect(multipleProductsRadio).toBeChecked();
    });
  });

  describe('Tratamento de erros', () => {
    test('deve exibir mensagem de erro quando fornecida', () => {
      const errorMessage = 'Selecione um tipo de recomendação';
      render(<RecommendationType {...defaultProps} error={errorMessage} />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
