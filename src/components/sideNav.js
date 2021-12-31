import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import { motion } from "framer-motion";
import { useLocation } from "@reach/router";
import { ModalProvider } from "../contexts/modal-provider";
import ContactFormCTA from "./contactFormCTA";

const SideNavItem = ({ to, children }) => {
  const location = useLocation();
  return (
    <li className="relative nav-item">
      <Link
        className="flex items-center h-5 p-5 px-5 text-xl text-left rounded-sm text-5"
        activeClassName="nav-item--active"
        to={to}
      >
        <span className="transition-colors nav-item-text hover:text-gray-500">
          {children}
        </span>
        <motion.span
          animate={{
            width: location.pathname === to ? "calc(100% - 20px)" : "0",
          }}
          className="nav-item-arrow"
        ></motion.span>
      </Link>
    </li>
  );
};

const SideNav = ({ onToggleMobileNav }) => {
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
      <button
        onClick={onToggleMobileNav}
        className="flex items-center justify-center mt-3 ml-3 md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
          />
        </svg>
      </button>
      <ul className="pt-3 space-y-1 md:pt-10">
        <>
          <SideNavItem to="/">All Projects</SideNavItem>
          {filterNavItems}
          <SideNavItem to="/about">About</SideNavItem>
        </>
      </ul>
      <ModalProvider>
        <ContactFormCTA>Contact</ContactFormCTA>
      </ModalProvider>
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
