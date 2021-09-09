import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const SideNavItem = ({ to, children }) => {
  return (
    <li>
      <Link
        className="flex items-center h-5 p-5 px-5 text-xl text-left rounded-sm text-5 hover:text-gray-70"
        activeClassName="text-blue-50"
        to={to}
      >
        {children}
      </Link>
    </li>
  );
};

const SideNav = ({ location, navItems, children }) => {
  const showFilters = location.pathname === "/";

  const filterNavItems = Array.from(Array(4)).map((_, i) => (
    <SideNavItem key={i} to={`?filter=${i}`}>
      Item {i}
    </SideNavItem>
  ));

  return (
    <nav>
      <ul className="space-y-1">
        {showFilters ? (
          <>
            {filterNavItems}
            <SideNavItem to="?filter=all">All</SideNavItem>
            <SideNavItem to="/about">About</SideNavItem>
          </>
        ) : (
          <SideNavItem to="/">Home</SideNavItem>
        )}
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
