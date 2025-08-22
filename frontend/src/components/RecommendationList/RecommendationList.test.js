import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import RecommendationList from './RecommendationList';

describe('RecommendationList', () => {
  const mockRecommendations = [
    {
      id: 1,
      name: 'Produto Email Marketing',
      category: 'Email Marketing',
      preferences: ['Integração fácil com ferramentas de e-mail', 'Personalização de funis de vendas'],
      features: ['Gestão de leads e oportunidades', 'Automação de fluxos de trabalho de vendas'],
    },
    {
      id: 2,
      name: 'Produto CRM',
      category: 'CRM',
      preferences: ['Automação de marketing', 'Testes A/B para otimização de campanhas'],
      features: ['Criação e gestão de campanhas de e-mail', 'Rastreamento de comportamento do usuário'],
    },
  ];

  describe('Renderização com recomendações', () => {
    test('deve renderizar o título "Recomendações"', () => {
      render(<RecommendationList recommendations={mockRecommendations} />);

      expect(screen.getByText('Recomendações')).toBeInTheDocument();
    });

    test('deve renderizar todos os produtos da lista', () => {
      render(<RecommendationList recommendations={mockRecommendations} />);

      expect(screen.getByText('Produto Email Marketing')).toBeInTheDocument();
      expect(screen.getByText('Produto CRM')).toBeInTheDocument();
    });
  });

  describe('Renderização de preferências', () => {
    test('deve exibir a seção de preferências quando há preferências', () => {
      render(<RecommendationList recommendations={mockRecommendations} />);

      const preferenceSections = screen.getAllByText('Preferências atendidas');
      expect(preferenceSections).toHaveLength(2); // 2 produtos, cada um com sua seção
    });

    test('não deve exibir a seção de preferências quando não há preferências', () => {
      const recommendationsWithoutPreferences = [
        {
          id: 1,
          name: 'Produto Sem Preferências',
          category: 'Teste',
          preferences: [],
          features: ['Feature 1'],
        },
      ];

      render(<RecommendationList recommendations={recommendationsWithoutPreferences} />);

      expect(screen.queryByText('Preferências atendidas')).not.toBeInTheDocument();
    });
  });
});
