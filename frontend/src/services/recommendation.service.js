/**
 * Normaliza uma lista removendo valores nulos, undefined ou vazios.
 * @param {*} value - Valor a ser normalizado
 * @returns {Array} Array filtrado sem valores falsy
 */
const normalizeList = (value) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

/**
 * Conta quantas vezes os valores de um array aparecem em um Set.
 * @param {Array} values - Array de valores a serem contados
 * @param {Set} selectedSet - Set de referência para comparação
 * @returns {number} Quantidade de matches encontrados
 */
const countMatches = (values, selectedSet) =>
  (Array.isArray(values) ? values : []).reduce(
    (accumulator, current) => accumulator + (selectedSet.has(current) ? 1 : 0),
    0
  );

/**
 * Calcula o score de um produto baseado nas preferências e funcionalidades selecionadas.
 * @param {Object} product - Produto para cálculo do score
 * @param {Set} preferencesSet - Set de preferências selecionadas
 * @param {Set} featuresSet - Set de funcionalidades selecionadas
 * @returns {number} Score calculado para o produto
 */
const calculateProductScore = (product, preferencesSet, featuresSet) =>
  countMatches(product.preferences, preferencesSet) +
  countMatches(product.features, featuresSet);

/**
 * Encontra o produto com maior score para recomendação única.
 * Em caso de empate, retorna o último produto com o maior score.
 * @param {Array} products - Lista de produtos disponíveis
 * @param {Set} preferencesSet - Set de preferências selecionadas
 * @param {Set} featuresSet - Set de funcionalidades selecionadas
 * @returns {Array} Array com o melhor produto ou vazio se nenhum produto tiver score > 0
 */
const findBestSingleProduct = (products, preferencesSet, featuresSet) => {
  let bestProduct = null;
  let bestScore = -1;

  for (const product of products) {
    const score = calculateProductScore(product, preferencesSet, featuresSet);

    if (score >= bestScore) {
      bestScore = score;
      bestProduct = product;
    }
  }

  return bestScore > 0 ? [bestProduct] : [];
};

/**
 * Encontra todos os produtos com score > 0, ordenados por score decrescente.
 * @param {Array} products - Lista de produtos disponíveis
 * @param {Set} preferencesSet - Set de preferências selecionadas
 * @param {Set} featuresSet - Set de funcionalidades selecionadas
 * @returns {Array} Lista de produtos ordenados por score (maior para menor)
 */
const findMultipleProducts = (products, preferencesSet, featuresSet) => {
  const productsWithScore = products
    .map((product) => ({
      product,
      score: calculateProductScore(product, preferencesSet, featuresSet),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return productsWithScore.map((item) => item.product);
};

const getRecommendations = (formData = {}, products = []) => {
  if (!products.length) {
    return [];
  }

  const selectedPreferences = normalizeList(formData.selectedPreferences);
  const selectedFeatures = normalizeList(formData.selectedFeatures);
  const recommendationType = formData?.selectedRecommendationType;

  const preferencesSet = new Set(selectedPreferences);
  const featuresSet = new Set(selectedFeatures);

  switch (recommendationType) {
    case 'SingleProduct':
      return findBestSingleProduct(products, preferencesSet, featuresSet);

    case 'MultipleProducts':
      return findMultipleProducts(products, preferencesSet, featuresSet);

    default:
      return [];
  }
};

const recommendationService = { getRecommendations };

export default recommendationService;
