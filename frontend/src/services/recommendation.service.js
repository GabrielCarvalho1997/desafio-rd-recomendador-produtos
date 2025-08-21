// Função para normalizar listas removendo valores nulos
const normalizeList = (value) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

// Função para contar quantas vezes um valor aparece no array
const countMatches = (values, selectedSet) =>
  (Array.isArray(values) ? values : []).reduce(
    (accumulator, current) => accumulator + (selectedSet.has(current) ? 1 : 0),
    0
  );

const getRecommendations = (formData = {}, products = []) => {
  const selectedPreferences = normalizeList(formData.selectedPreferences);
  const selectedFeatures = normalizeList(formData.selectedFeatures);
  const recommendationType = formData?.selectedRecommendationType;

  if (!products.length) {
    return [];
  }

  const preferencesSet = new Set(selectedPreferences);
  const featuresSet = new Set(selectedFeatures);

  // SingleProduct: retorna somente o produto com maior score.
  // Em caso de empate, retorna o último produto com o maior score.
  if (recommendationType === 'SingleProduct') {
    let bestProduct = null;
    let bestScore = -1;

    for (const product of products) {
      const score =
        countMatches(product.preferences, preferencesSet) +
        countMatches(product.features, featuresSet);

      if (score >= bestScore) {
        bestScore = score;
        bestProduct = product; // empates favorecem o último
      }
    }

    console.log('bestProduct', bestProduct);
    return bestScore > 0 ? [bestProduct] : [];
  }

  // MultipleProducts: retorna todos os produtos com score maior que 0, ordenados pelo score em ordem decrescente
  if (recommendationType === 'MultipleProducts') {
    const productsWithScore = products
      .map((product) => ({
        product,
        score:
          countMatches(product.preferences, preferencesSet) +
          countMatches(product.features, featuresSet),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    console.log('bestProducts', productsWithScore);
    return productsWithScore.map((item) => item.product);
  }

  return [];
};

const recommendationService = { getRecommendations };

export default recommendationService;
