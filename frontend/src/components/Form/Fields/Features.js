import React, { useEffect, useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange, error }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures);

  // Sincronizar com as props quando mudarem
  useEffect(() => {
    setCurrentFeatures(selectedFeatures);
  }, [selectedFeatures]);

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div className="bg-rd-support-white rounded-lg p-4 sm:p-6 border border-rd-support-gray-200 shadow-sm">
      <div className="flex items-center mb-3 sm:mb-4">
        <div className="w-2 h-5 sm:h-6 bg-rd-primary-light rounded-full mr-2 sm:mr-3"></div>
        <h3 className="text-lg sm:text-xl font-semibold text-rd-primary-dark">
          Funcionalidades
        </h3>
      </div>
      <p className="text-rd-support-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
        Escolha as funcionalidades que você precisa
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              className="text-rd-primary-light"
            >
              <span className="text-rd-support-gray-700 font-medium text-sm">
                {feature}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

export default Features;
