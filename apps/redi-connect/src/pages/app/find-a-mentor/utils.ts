export const getCurrentUrlParams = () => {
  const paramsFromUrl = window.location.search.slice(1);
  const params = new URLSearchParams(paramsFromUrl);
  return params;
};

export const getUrlParamValue = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const setUrlParam = (name, value) => {
  const params = getCurrentUrlParams();
  params.set(name, value);
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
};

export const clearQuery = () => {
  return window.history.replaceState({}, '', `${window.location.pathname}`);
}

export function toggleValueInArray<T>(array: Array<T>, value: T) {
  if (array.includes(value)) return array.filter((val) => val !== value)
  else return [...array, value]
}

/// toggleValueInArray([1, 2, 3], 2) ==> [1,3]
/// toggleValueInArray([1,2,3], 4) ==> [1,2,3,4]