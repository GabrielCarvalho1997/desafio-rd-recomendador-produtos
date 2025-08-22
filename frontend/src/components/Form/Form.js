// Form.js

import React from 'react';
import useForm from '../../hooks/useForm';
import useProducts from '../../hooks/useProducts';
import useRecommendations from '../../hooks/useRecommendations';
import { Features, Preferences, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';

function Form({ updateRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange, errors, validateForm, clearErrors } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const { getRecommendations } = useRecommendations(products);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar formulário antes de seguir
    if (!validateForm()) {
      return;
    }

    const dataRecommendations = getRecommendations(formData);

    if (updateRecommendations) {
      updateRecommendations(dataRecommendations);
      clearErrors();
    }
  };

  return (
    <form
      className="w-full space-y-4 sm:space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4 sm:space-y-6">
        <Preferences
          preferences={preferences}
          selectedPreferences={formData.selectedPreferences}
          onPreferenceChange={(selected) =>
            handleChange('selectedPreferences', selected)
          }
          error={errors.preferences}
        />

        <Features
          features={features}
          selectedFeatures={formData.selectedFeatures}
          onFeatureChange={(selected) =>
            handleChange('selectedFeatures', selected)
          }
          error={errors.features}
        />

        <RecommendationType
          selectedType={formData.selectedRecommendationType}
          onRecommendationTypeChange={(selected) =>
            handleChange('selectedRecommendationType', selected)
          }
          error={errors.recommendationType}
        />
      </div>

      <div className="pt-3 sm:pt-4 border-t border-rd-support-gray-200">
        <SubmitButton text="Obter Recomendação" />
      </div>
    </form>
  );
}

export default Form;
