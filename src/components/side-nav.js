import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

const SideNavItem = ({ to, children }) => {
  return (
    <li>
      <Link
        className="flex items-center h-5 p-5 px-5 text-left rounded-sm text-5 hover:text-gray-70"
        to={to}
      >
        {children}
      </Link>
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
          Array.from(Array(4)).map((_, i) => (
            <SideNavItem key={i} to={`?filter=${i}`}>
              Item {i}
            </SideNavItem>
          ))}
        {showFilters && (
          <>
            <SideNavItem to="?filter=all">All</SideNavItem>
            <SideNavItem to="/about">About</SideNavItem>
          </>
        )}
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
