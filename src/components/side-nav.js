import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";
import { useFilters } from "../contexts/filters-context";

const SideNavItem = ({ filter, children }) => {
  const { activeFilter, setActiveFilter } = useFilters();
  return (
    <li>
      <button
        onClick={() => setActiveFilter(filter)}
        className="flex items-center h-5 p-5 text-left rounded-sm text-5 hover:text-gray-70"
      >
        {children}
      </button>
    </li>
  );
};

const SideNav = ({ navItems, children }) => {
  const location = useLocation();
  const showFilters = location.pathname === "/";
  return (
    <nav>
      <ul className="space-y-1">
        {showFilters &&
          Array.from(Array(5)).map((_, i) => (
            <SideNavItem key={i} filter={`?filter=${i}`}>
              Filter {i}
            </SideNavItem>
          ))}
        {showFilters && <SideNavItem to="/about">About</SideNavItem>}
        {!showFilters && <SideNavItem to="/">Home</SideNavItem>}
      </ul>
    </nav>
  );
};

SideNav.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SideNav;
