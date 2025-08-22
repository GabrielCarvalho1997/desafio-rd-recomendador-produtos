import React from 'react';

function RecommendationType({ onRecommendationTypeChange, selectedType = '', error }) {
  const handleTypeChange = (type) => {
    onRecommendationTypeChange(type);
  };

  return (
    <div className="bg-rd-support-white rounded-lg p-4 sm:p-6 border border-rd-support-gray-200 shadow-sm">
      <div className="flex items-center mb-3 sm:mb-4">
        <div className="w-2 h-5 sm:h-6 bg-rd-primary-dark rounded-full mr-2 sm:mr-3"></div>
        <h3 className="text-lg sm:text-xl font-semibold text-rd-primary-dark">
          Tipo de Recomendação
        </h3>
      </div>
      <p className="text-rd-support-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
        Escolha como você quer receber as recomendações
      </p>
      <div className="space-y-2 sm:space-y-3">
        <div
          className={`flex items-center p-2 sm:p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
            selectedType === 'SingleProduct'
              ? 'border-rd-primary-medium bg-rd-primary-medium bg-opacity-5'
              : 'border-rd-support-gray-200 hover:border-rd-primary-medium'
          }`}
          onClick={() => handleTypeChange('SingleProduct')}
        >
          <div className="relative">
            <input
              type="radio"
              name="recommendationType"
              value="SingleProduct"
              checked={selectedType === 'SingleProduct'}
              onChange={() => handleTypeChange('SingleProduct')}
              className="sr-only"
            />
            <div className={`w-4 sm:w-5 h-4 sm:h-5 border-2 rounded-full transition-all duration-200 ${
              selectedType === 'SingleProduct'
                ? 'border-rd-primary-medium'
                : 'border-rd-support-gray-300'
            }`}>
              {selectedType === 'SingleProduct' && (
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-rd-primary-medium rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
          </div>
          <span className={`ml-2 sm:ml-3 font-medium text-sm ${
            selectedType === 'SingleProduct'
              ? 'text-rd-primary-dark'
              : 'text-rd-support-gray-700'
          }`}>
            Produto Único
          </span>
        </div>

        <div
          className={`flex items-center p-2 sm:p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
            selectedType === 'MultipleProducts'
              ? 'border-rd-primary-medium bg-rd-primary-medium bg-opacity-5'
              : 'border-rd-support-gray-200 hover:border-rd-primary-medium'
          }`}
          onClick={() => handleTypeChange('MultipleProducts')}
        >
          <div className="relative">
            <input
              type="radio"
              name="recommendationType"
              value="MultipleProducts"
              checked={selectedType === 'MultipleProducts'}
              onChange={() => handleTypeChange('MultipleProducts')}
              className="sr-only"
            />
            <div className={`w-4 sm:w-5 h-4 sm:h-5 border-2 rounded-full transition-all duration-200 ${
              selectedType === 'MultipleProducts'
                ? 'border-rd-primary-medium'
                : 'border-rd-support-gray-300'
            }`}>
              {selectedType === 'MultipleProducts' && (
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-rd-primary-medium rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
          </div>
          <span className={`ml-2 sm:ml-3 font-medium text-sm ${
            selectedType === 'MultipleProducts'
              ? 'text-rd-primary-dark'
              : 'text-rd-support-gray-700'
          }`}>
            Múltiplos Produtos
          </span>
        </div>
      </div>

      {error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

export default RecommendationType;
