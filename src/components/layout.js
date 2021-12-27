import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import SideNav from "./sideNav";
import FilterProvider from "../contexts/filter-provider";
import { motion, AnimatePresence } from "framer-motion";
import useMatchMedia from "../hooks/useMatchMedia";

const Layout = ({ children }) => {
  const [navIsOpen, setNavIsOpen] = useState(true);
  const isMobileScreen = useMatchMedia("(max-width: 768px)");
  const navWidth = "230px";

  const handleMobileNavToggle = () => {
    setNavIsOpen(!navIsOpen);
  };

  useEffect(() => {
    setNavIsOpen(!isMobileScreen);
  }, [isMobileScreen]);

  return (
    <FilterProvider>
      <Helmet>
        <title>Courtney Whiting's Portfolio</title>
        <link
          href="https://use.typekit.net/oov2wcw.css"
          rel="stylesheet"
        ></link>
      </Helmet>
      <button
        onClick={handleMobileNavToggle}
        className="fixed z-20 flex items-center justify-center bg-white border-2 border-black rounded-full left-3 top-3 h-11 w-11 md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="flex h-screen">
        <motion.section
          key={0}
          initial={{ x: !isMobileScreen && navIsOpen ? 0 : "-100%" }}
          animate={{ x: navIsOpen ? 0 : "-100%" }}
          transition={{ bounce: 0.55 }}
          className="fixed top-0 z-20 flex-shrink-0 h-screen overflow-y-auto transform bg-white md:static md:-translate-x-0 transform-none"
          style={{ width: navWidth }}
        >
          <SideNav onToggleMobileNav={handleMobileNavToggle} />
        </motion.section>
        <section key={1} className="flex flex-col flex-grow">
          <main className="flex-grow w-full px-4 pt-12 pb-12 m-auto overflow-y-auto max-w-screen-desk">
            {children}
          </main>
          <AnimatePresence>
            {navIsOpen && isMobileScreen && (
              <motion.div
                onClick={() => setNavIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: navIsOpen ? 0.7 : 0 }}
                transition={{ bounce: 0.55 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black cursor-pointer"
              ></motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </FilterProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
