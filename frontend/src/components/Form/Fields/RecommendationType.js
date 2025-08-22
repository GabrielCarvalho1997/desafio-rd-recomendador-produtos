import React, { useState } from 'react';

function RecommendationType({ onRecommendationTypeChange, selectedType = '' }) {
  const [selected, setSelected] = useState(selectedType);

  const handleTypeChange = (type) => {
    setSelected(type);
    onRecommendationTypeChange(type);
  };

  return (
    <div className="bg-rd-support-white rounded-lg p-6 border border-rd-support-gray-200 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-2 h-6 bg-rd-primary-dark rounded-full mr-3"></div>
        <h3 className="text-xl font-semibold text-rd-primary-dark">
          Tipo de Recomendação
        </h3>
      </div>
      <p className="text-rd-support-gray-600 mb-4 text-sm">
        Escolha como você quer receber as recomendações
      </p>
      <div className="space-y-3">
        <div
          className={`flex items-center p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
            selected === 'SingleProduct'
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
              checked={selected === 'SingleProduct'}
              onChange={() => handleTypeChange('SingleProduct')}
              className="sr-only"
            />
            <div className={`w-5 h-5 border-2 rounded-full transition-all duration-200 ${
              selected === 'SingleProduct'
                ? 'border-rd-primary-medium'
                : 'border-rd-support-gray-300'
            }`}>
              {selected === 'SingleProduct' && (
                <div className="w-2.5 h-2.5 bg-rd-primary-medium rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
          </div>
          <span className={`ml-3 font-medium ${
            selected === 'SingleProduct'
              ? 'text-rd-primary-dark'
              : 'text-rd-support-gray-700'
          }`}>
            Produto Único
          </span>
        </div>

        <div
          className={`flex items-center p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
            selected === 'MultipleProducts'
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
              checked={selected === 'MultipleProducts'}
              onChange={() => handleTypeChange('MultipleProducts')}
              className="sr-only"
            />
            <div className={`w-5 h-5 border-2 rounded-full transition-all duration-200 ${
              selected === 'MultipleProducts'
                ? 'border-rd-primary-medium'
                : 'border-rd-support-gray-300'
            }`}>
              {selected === 'MultipleProducts' && (
                <div className="w-2.5 h-2.5 bg-rd-primary-medium rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>
          </div>
          <span className={`ml-3 font-medium ${
            selected === 'MultipleProducts'
              ? 'text-rd-primary-dark'
              : 'text-rd-support-gray-700'
          }`}>
            Múltiplos Produtos
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecommendationType;
