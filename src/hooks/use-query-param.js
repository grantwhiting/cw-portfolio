import { navigate, useLocation } from "@reach/router";

const useQueryParam = (defaultValue, paramName) => {
  const { search } = useLocation();

  const getParam = (search) => {
    const urlParams = new URLSearchParams(search);
    return urlParams.get(paramName);
  };

  const setParam = (value) => {
    const urlParams = new URLSearchParams(search);
    urlParams.set(paramName, value);
    navigate(`?${urlParams.toString()}`);
  };

  return [getParam(search) || defaultValue, setParam];
};

export default useQueryParam;
