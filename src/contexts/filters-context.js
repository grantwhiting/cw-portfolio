import React, { useEffect, createContext, useRef, useContext } from "react";
import useQueryParam from "../hooks/use-query-param";

const FiltersContext = createContext();

const FiltersProvider = ({ initialFilters, children }) => {
  const availableFilters = useRef(initialFilters);
  const defaultFilter = useRef("all");
  const [filterParam, setFilterParam] = useQueryParam(defaultFilter.current);

  const isValidFilter = (filter) =>
    availableFilters.current.indexOf(filter) > -1;

  useEffect(() => {
    if (filterParam && !isValidFilter(filterParam)) {
      setFilterParam(defaultFilter.current);
    }
  }, [filterParam, setFilterParam]);

  const setActiveFilter = (filter) => {
    const validFilter = isValidFilter(filter) ? filter : defaultFilter.current;
    setFilterParam(validFilter);
  };

  const value = { activeFilter: filterParam, setActiveFilter };

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};

export { FiltersProvider, useFilters };
