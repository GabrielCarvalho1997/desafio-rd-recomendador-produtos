import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';

function Features({ features, selectedFeatures = [], onFeatureChange }) {
  const [currentFeatures, setCurrentFeatures] = useState(selectedFeatures)

  const handleFeatureChange = (feature) => {
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((pref) => pref !== feature)
      : [...currentFeatures, feature];

    setCurrentFeatures(updatedFeatures);
    onFeatureChange(updatedFeatures);
  };

  return (
    <div className="bg-rd-support-white rounded-lg p-6 border border-rd-support-gray-200 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-2 h-6 bg-rd-primary-light rounded-full mr-3"></div>
        <h3 className="text-xl font-semibold text-rd-primary-dark">
          Funcionalidades
        </h3>
      </div>
      <p className="text-rd-support-gray-600 mb-4 text-sm">
        Escolha as funcionalidades que você precisa
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Checkbox
              value={feature}
              checked={currentFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              className="text-rd-primary-light"
            >
              <span className="text-rd-support-gray-700 font-medium">
                {feature}
              </span>
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
