import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Form from './Form';

// Mock dos hooks
jest.mock('../../hooks/useForm');
jest.mock('../../hooks/useProducts');
jest.mock('../../hooks/useRecommendations');

// Mock dos serviços para evitar problemas com axios
jest.mock('../../services/product.service', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../services/recommendation.service', () => ({
  __esModule: true,
  default: {
    getRecommendations: jest.fn(),
  },
}));

// Mock dos componentes filhos
jest.mock('./Fields', () => ({
  Features: ({ features, selectedFeatures, onFeatureChange, error }) => (
    <div data-testid="features-component">
      <h3>Funcionalidades</h3>
      {features.map((feature, index) => (
        <div key={index} onClick={() => onFeatureChange([...selectedFeatures, feature])}>
          {feature}
        </div>
      ))}
      {error && <span data-testid="features-error">{error}</span>}
    </div>
  ),
  Preferences: ({ preferences, selectedPreferences, onPreferenceChange, error }) => (
    <div data-testid="preferences-component">
      <h3>Preferências</h3>
      {preferences.map((pref, index) => (
        <div key={index} onClick={() => onPreferenceChange([...selectedPreferences, pref])}>
          {pref}
        </div>
      ))}
      {error && <span data-testid="preferences-error">{error}</span>}
    </div>
  ),
  RecommendationType: ({ selectedType, onRecommendationTypeChange, error }) => (
    <div data-testid="recommendation-type-component">
      <h3>Tipo de Recomendação</h3>
      <select
        value={selectedType}
        onChange={(e) => onRecommendationTypeChange(e.target.value)}
        data-testid="recommendation-type-select"
      >
        <option value="">Selecione</option>
        <option value="SingleProduct">Produto Único</option>
        <option value="MultipleProducts">Múltiplos Produtos</option>
      </select>
      {error && <span data-testid="recommendation-type-error">{error}</span>}
    </div>
  ),
}));

jest.mock('./SubmitButton', () => ({
  SubmitButton: ({ text }) => (
    <button type="submit" data-testid="submit-button">
      {text}
    </button>
  ),
}));

describe('Form', () => {
  const mockUpdateRecommendations = jest.fn();

  const mockUseForm = {
    formData: {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: '',
    },
    handleChange: jest.fn(),
    errors: {},
    validateForm: jest.fn(),
    clearErrors: jest.fn(),
  };

  const mockUseProducts = {
    preferences: ['Preferência 1', 'Preferência 2'],
    features: ['Feature 1', 'Feature 2'],
    products: [
      { id: 1, name: 'Produto 1', category: 'Email' },
      { id: 2, name: 'Produto 2', category: 'CRM' },
    ],
  };

  const mockUseRecommendations = {
    getRecommendations: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup dos mocks
    require('../../hooks/useForm').default.mockReturnValue(mockUseForm);
    require('../../hooks/useProducts').default.mockReturnValue(mockUseProducts);
    require('../../hooks/useRecommendations').default.mockReturnValue(mockUseRecommendations);
  });

  describe('Renderização', () => {
    test('deve renderizar o formulário com todos os componentes filhos', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      expect(screen.getByTestId('preferences-component')).toBeInTheDocument();
      expect(screen.getByTestId('features-component')).toBeInTheDocument();
      expect(screen.getByTestId('recommendation-type-component')).toBeInTheDocument();
      expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });
  });

  describe('Submissão do formulário', () => {
    test('deve chamar validateForm quando o formulário é submetido', () => {
      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);

      expect(mockUseForm.validateForm).toHaveBeenCalled();
    });

    test('deve chamar updateRecommendations quando o formulário é válido e tem recomendações', () => {
      const mockRecommendations = [
        { id: 1, name: 'Produto 1', category: 'Email' }
      ];

      mockUseForm.validateForm.mockReturnValue(true);
      mockUseForm.formData = {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };
      mockUseRecommendations.getRecommendations.mockReturnValue(mockRecommendations);

      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);

      expect(mockUpdateRecommendations).toHaveBeenCalledWith(mockRecommendations);
      expect(mockUseForm.clearErrors).toHaveBeenCalled();
    });

    test('não deve chamar updateRecommendations quando o formulário é inválido', () => {
      mockUseForm.validateForm.mockReturnValue(false);

      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      const submitButton = screen.getByTestId('submit-button');
      fireEvent.click(submitButton);

      expect(mockUpdateRecommendations).not.toHaveBeenCalled();
      expect(mockUseForm.clearErrors).not.toHaveBeenCalled();
    });
  });

  describe('Exibição de erros', () => {
    test('deve exibir erros de preferências quando fornecidos', () => {
      mockUseForm.errors = { preferences: 'Erro de preferências' };

      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      expect(screen.getByTestId('preferences-error')).toHaveTextContent('Erro de preferências');
    });

    test('deve exibir erros de funcionalidades quando fornecidos', () => {
      mockUseForm.errors = { features: 'Erro de funcionalidades' };

      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      expect(screen.getByTestId('features-error')).toHaveTextContent('Erro de funcionalidades');
    });

    test('deve exibir erros de tipo de recomendação quando fornecidos', () => {
      mockUseForm.errors = { recommendationType: 'Erro de tipo' };

      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      expect(screen.getByTestId('recommendation-type-error')).toHaveTextContent('Erro de tipo');
    });
  });

  describe('Cálculo de recomendações', () => {
    test('deve calcular recomendações quando há dados válidos', () => {
      mockUseForm.formData = {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      expect(mockUseRecommendations.getRecommendations).toHaveBeenCalledWith(mockUseForm.formData);
    });

    test('não deve calcular recomendações quando não há preferências nem funcionalidades', () => {
      mockUseForm.formData = {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: 'SingleProduct',
      };

      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      expect(mockUseRecommendations.getRecommendations).not.toHaveBeenCalled();
    });

    test('não deve calcular recomendações quando não há tipo de recomendação', () => {
      mockUseForm.formData = {
        selectedPreferences: ['Preferência 1'],
        selectedFeatures: [],
        selectedRecommendationType: '',
      };

      render(<Form updateRecommendations={mockUpdateRecommendations} />);

      expect(mockUseRecommendations.getRecommendations).not.toHaveBeenCalled();
    });
  });
});
