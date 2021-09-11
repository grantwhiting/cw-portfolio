import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";

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

  const {
    allWpCategory: { nodes: categories },
  } = useStaticQuery(graphql`
    query CategoriesQuery {
      allWpCategory {
        nodes {
          id
          name
        }
      }
    }
  `);

  const filteredCategories = categories.filter(
    (category) => category.name !== "Uncategorized"
  );

  const filterNavItems = filteredCategories.map((category) => (
    <SideNavItem
      key={category.id}
      to={`?filter=${category.name}`}
      isActive={decodeURI(search) === `?filter=${category.name}`}
    >
      {category.name}
    </SideNavItem>
  ));

  return (
    <nav>
      <ul className="space-y-1">
        {showFilters ? (
          <>
            <SideNavItem to="?filter=all" isActive={search === "?filter=all"}>
              All
            </SideNavItem>
            {filterNavItems}
            <SideNavItem to="/about">About</SideNavItem>
          </>
        ) : (
          <SideNavItem to="/?filter=all">Home</SideNavItem>
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
