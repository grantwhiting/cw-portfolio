import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const SideNavItem = ({ to, children }) => {
  return (
    <li>
      <Link
        className="flex items-center h-5 p-5 text-left rounded-sm px5-5 p- text-5 hover:text-gray-70"
        activeClassName="text-blue-40 bg-blue-30 bg-opacity-5 hover:text-blue-40 hover:bg-blue-30 hover:bg-opacity-5"
        to={to}
      >
        {children}
      </Link>
    </li>
  );
};

const SideNav = ({ navItems, children }) => {
  return (
    <nav>
      <ul className="space-y-1">
        {Array.from(Array(4)).map((_, i) => (
          <SideNavItem key={i} to={`?filter=${i}`}>
            Item {i}
          </SideNavItem>
        ))}
        <SideNavItem to="/about-me">About</SideNavItem>
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
