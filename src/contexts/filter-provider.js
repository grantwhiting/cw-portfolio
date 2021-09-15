import React, { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PropTypes from "prop-types";

const FilterContext = createContext({});

export const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  const [storedValue, setLocalStorageValue] = useLocalStorage(
    "currentFilter",
    "all"
  );

  return (
    <FilterContext.Provider
      value={{
        currentFilter: storedValue,
        setCurrentFilter: setLocalStorageValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]).isRequired;

export default FilterProvider;
