// Form.js

import React from 'react';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import useRecommendations from '../../hooks/useRecommendations';
import { Features, Preferences, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';

function Form({ updateRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRecommendations = getRecommendations(formData);

    if (updateRecommendations) {
      updateRecommendations(dataRecommendations);
    }
  };

  return (
    <form
      className="w-full space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        <Preferences
          preferences={preferences}
          onPreferenceChange={(selected) =>
            handleChange('selectedPreferences', selected)
          }
        />
        <Features
          features={features}
          onFeatureChange={(selected) =>
            handleChange('selectedFeatures', selected)
          }
        />
        <RecommendationType
          selectedType={formData.selectedRecommendationType}
          onRecommendationTypeChange={(selected) =>
            handleChange('selectedRecommendationType', selected)
          }
        />
      </div>

      <div className="pt-4 border-t border-rd-support-gray-200">
        <SubmitButton text="Obter Recomendação" />
      </div>
    </form>
  );
}

export default Form;
