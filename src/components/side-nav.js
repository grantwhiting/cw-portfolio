import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const SideNavItem = ({ to, children, isActive }) => {
  return (
    <li className={`relative nav-item ${isActive && "nav-item--active"}`}>
      <Link
        className="flex items-center h-5 p-5 px-5 text-xl text-left rounded-sm text-5 hover:text-gray-70"
        to={to}
      >
        <span className="nav-item-text">{children}</span>
        <span className="nav-item-arrow"></span>
      </Link>
    </li>
  );
};

const SideNav = ({ location, navItems, children }) => {
  const { pathname, search } = location;
  const showFilters = pathname === "/";

  const filterNavItems = Array.from(Array(4)).map((_, i) => {
    return (
      <SideNavItem
        key={i}
        to={`?filter=${i}`}
        isActive={search === `?filter=${i}`}
      >
        Item {i}
      </SideNavItem>
    );
  });

  return (
    <nav>
      <ul className="space-y-1">
        {showFilters ? (
          <>
            {filterNavItems}
            <SideNavItem to="?filter=all" isActive={search === "?filter=all"}>
              All
            </SideNavItem>
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
