// useForm.js
import { useCallback, useState } from 'react';

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Limpar erro do campo quando o usuário fizer alteração
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    // Validar se pelo menos uma preferência OU funcionalidade foi selecionada
    const hasPreferences = formData.selectedPreferences.length > 0;
    const hasFeatures = formData.selectedFeatures.length > 0;

    if (!hasPreferences && !hasFeatures) {
      newErrors.preferences = 'Selecione pelo menos uma preferência ou funcionalidade';
      newErrors.features = 'Selecione pelo menos uma preferência ou funcionalidade';
    }

    // Validar se o tipo de recomendação foi selecionado
    if (!formData.selectedRecommendationType) {
      newErrors.recommendationType = 'Selecione um tipo de recomendação';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const clearErrors = () => {
    setErrors({});
  };

  return {
    formData,
    handleChange,
    errors,
    validateForm,
    clearErrors
  };
};

export default useForm;
