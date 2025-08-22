import React from 'react';

function RecommendationList({ recommendations }) {
  if (recommendations.length === 0) {
    return (
      <div className="bg-rd-support-white rounded-lg p-6 sm:p-8 border border-rd-support-gray-200 shadow-sm">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-rd-support-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg
              className="w-6 h-6 sm:w-8 sm:h-8 text-rd-support-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-rd-support-gray-600 mb-2">
            Nenhuma recomendação encontrada
          </h3>
          <p className="text-rd-support-gray-500 text-xs sm:text-sm">
            Preencha o formulário ao lado para receber recomendações personalizadas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center">
          <div className="w-2 h-5 sm:h-6 bg-rd-primary-medium rounded-full mr-2 sm:mr-3"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-rd-primary-dark">
            Recomendações
          </h3>
        </div>
        <span className="bg-rd-primary-light text-white text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
          {recommendations.length} {recommendations.length === 1 ? 'produto' : 'produtos'}
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={recommendation.id || index}
            className="bg-rd-support-white rounded-lg p-4 sm:p-6 border border-rd-support-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-rd-primary-dark mb-1">
                  {recommendation.name}
                </h4>
                <span className="inline-block bg-rd-primary-light bg-opacity-10 text-rd-primary-dark text-xs font-medium px-2 sm:px-3 py-1 rounded-full">
                  {recommendation.category}
                </span>
              </div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-rd-primary-medium to-rd-primary-light rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                {index + 1}
              </div>
            </div>

            {recommendation.preferences && recommendation.preferences.length > 0 && (
              <div className="mb-3 sm:mb-4">
                <h5 className="text-xs sm:text-sm font-medium text-rd-support-gray-700 mb-2 flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-rd-primary-medium mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Preferências atendidas
                </h5>
                <div className="space-y-1">
                  {recommendation.preferences.map((pref, prefIndex) => (
                    <div key={prefIndex} className="flex items-center text-xs sm:text-sm text-rd-support-gray-600">
                      <div className="w-1.5 h-1.5 bg-rd-primary-medium rounded-full mr-2"></div>
                      {pref}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendation.features && recommendation.features.length > 0 && (
              <div>
                <h5 className="text-xs sm:text-sm font-medium text-rd-support-gray-700 mb-2 flex items-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-rd-primary-light mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Funcionalidades principais
                </h5>
                <div className="space-y-1">
                  {recommendation.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs sm:text-sm text-rd-support-gray-600">
                      <div className="w-1.5 h-1.5 bg-rd-primary-light rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
