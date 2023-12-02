const useUrlParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const paramsObject = {};
  for (const [key, value] of searchParams) {
    paramsObject[key] = value;
  }

  return paramsObject
};

export default useUrlParams;
