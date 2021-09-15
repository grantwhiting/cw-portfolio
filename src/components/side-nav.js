import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";

const SideNavItem = ({ to, children }) => {
  return (
    <li className="relative nav-item">
      <Link
        className="flex items-center h-5 p-5 px-5 text-xl text-left rounded-sm text-5 hover:text-gray-70"
        activeClassName="nav-item--active"
        to={to}
      >
        <span className="nav-item-text">{children}</span>
        <span className="nav-item-arrow"></span>
      </Link>
    </li>
  );
};

const SideNav = () => {
  const {
    allWpCategory: { nodes: categories },
  } = useStaticQuery(graphql`
    query CategoriesQuery {
      allWpCategory {
        nodes {
          id
          name
          slug
        }
      }
    }
  `);

  const filteredCategories = categories.filter(
    (category) => category.name !== "Uncategorized"
  );

  const filterNavItems = filteredCategories.map((category) => (
    <SideNavItem key={category.id} to={`/${category.slug}`}>
      {category.name}
    </SideNavItem>
  ));

  return (
    <nav>
      <ul className="space-y-1">
        <>
          <SideNavItem to="/">All Projects</SideNavItem>
          {filterNavItems}
          <SideNavItem to="/about">About</SideNavItem>
        </>
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
