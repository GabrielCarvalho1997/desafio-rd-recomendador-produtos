import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  const handleRecommendationsChange = (newRecommendations) => {
    setRecommendations(newRecommendations);
  };

  return (
    <div className="bg-gradient-to-r from-rd-primary-dark to-rd-primary-light min-h-screen flex flex-col justify-center items-center p-2 sm:p-4">

      <header className="text-center mb-4 sm:mb-8 px-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rd-support-white mb-2 sm:mb-4 leading-tight">
          Recomendador de Produtos RD Station
        </h1>
      </header>

      <main className="bg-rd-support-white rounded-xl sm:rounded-2xl shadow-xl w-full max-w-7xl mx-auto overflow-hidden">
        <section className="bg-rd-primary-medium p-4 sm:p-6 md:p-8 text-center">
          <p className="text-rd-support-white text-sm sm:text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station,
            cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a
            Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-4 sm:p-6 md:p-8 bg-rd-support-gray-50 border-r-0 lg:border-r border-rd-support-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-rd-primary-dark mb-4 sm:mb-6">
              Suas Preferências
            </h2>
            <Form updateRecommendations={handleRecommendationsChange} />
          </div>

          <div className="p-4 sm:p-6 md:p-8 bg-rd-support-white">
            <h2 className="text-xl sm:text-2xl font-semibold text-rd-primary-dark mb-4 sm:mb-6">
              Recomendações
            </h2>
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </main>

      <footer className="mt-4 sm:mt-8 text-center text-rd-support-gray-600 px-2">
        <p className="text-xs sm:text-sm text-rd-support-white">
          Use o formulário para selecionar suas preferências e funcionalidades desejadas e receba
          recomendações personalizadas de produtos que melhor atendam às suas necessidades.
        </p>
      </footer>
    </div>
  );
}

export default App;
