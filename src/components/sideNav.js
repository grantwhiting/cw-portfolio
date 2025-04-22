import React from "react";
import PropTypes from "prop-types";
import { Link, useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import { ModalProvider } from "../contexts/modal-provider";
import ContactFormCTA from "./contactFormCTA";
import { motion } from "framer-motion";
import { StaticImage } from "gatsby-plugin-image";
import Icon from "../images/insta-icon.svg";

const spring = {
  type: "spring",
  damping: 50,
  stiffness: 750,
  mass: 2,
  duration: 0.5,
};

const variants = {
  collapsed: { width: 0 },
  expanded: { width: "calc(100% - 20px)" },
};

const SideNavItem = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="relative nav-item">
      <Link
        className="flex items-center h-5 p-5 px-5 text-xl text-left transition-colors rounded-sm text-5 hover:text-gray-500"
        activeClassName="nav-item--active"
        to={to}
      >
        <span className="nav-item-text">{children}</span>
        <motion.span
          variants={variants}
          animate={isActive ? "expanded" : "collapsed"}
          transition={spring}
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
          description
        }
      }
    }
  `);

  const filteredCategories = categories
    .filter(
      (category) =>
        category.name !== "Uncategorized" &&
        category.name !== "Kids' Lit Illustrations"
    )
    .sort((a, b) => parseInt(a.description) - parseInt(b.description));

  const filterNavItems = filteredCategories.map((category) => (
    <SideNavItem key={category.id} to={`/${category.slug}/`}>
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
      <div className="hidden md:flex">
        <StaticImage
          className="mt-12 mb-4 ml-auto mr-auto"
          style={{ width: "93%" }}
          src="../images/logo.png"
          alt="Courtney Whiting's Logo"
        />
      </div>
      <ul className="pt-3 space-y-1 md:mt-6">
        <SideNavItem to="/">Kids' Lit Illustrations</SideNavItem>
        {filterNavItems}
        <SideNavItem to="/about/">About</SideNavItem>
      </ul>
      <ModalProvider>
        <ContactFormCTA>Contact</ContactFormCTA>
      </ModalProvider>
      <Link
        to="https://www.instagram.com/bycourtneywhiting/"
        className="block mt-3 ml-6 w-9"
      >
        <Icon />
      </Link>
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
