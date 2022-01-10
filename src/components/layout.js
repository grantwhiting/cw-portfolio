import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import SideNav from "./sideNav";
import FilterProvider from "../contexts/filter-provider";
import { motion, AnimatePresence } from "framer-motion";
import useMatchMedia from "../hooks/useMatchMedia";

const Layout = ({ children }) => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const isMobile = useMatchMedia("(max-width: 768px)");

  useEffect(() => setFirstRender(false), []);

  const navWidth = "230px";

  const handleMobileNavToggle = () => {
    setMobileNavIsOpen(!mobileNavIsOpen);
  };

  const mobileNavVariants = {
    enter: {
      x: 0,
    },
    exit: {
      x: "-100%",
    },
  };

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
      <div className="flex h-screen mx-auto">
        <AnimatePresence initial={false}>
          {isMobile && mobileNavIsOpen && (
            <motion.section
              key="mNav"
              variants={mobileNavVariants}
              initial="exit"
              animate="enter"
              exit="exit"
              className="fixed top-0 z-20 flex-shrink-0 h-screen overflow-y-auto bg-white"
              style={{ width: navWidth }}
            >
              <SideNav onToggleMobileNav={handleMobileNavToggle} />
            </motion.section>
          )}
        </AnimatePresence>
        {!isMobile && !firstRender && (
          <section className="flex-shrink-0 h-screen bg-white">
            <SideNav onToggleMobileNav={handleMobileNavToggle} />
          </section>
        )}
        <section className="flex flex-col flex-grow">
          <main className="flex-grow w-full px-4 pt-12 pb-12 m-auto overflow-y-auto max-w-screen-desk">
            {children}
          </main>
          <AnimatePresence>
            {mobileNavIsOpen && isMobile && (
              <motion.div
                onClick={() => setMobileNavIsOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: mobileNavIsOpen ? 0.7 : 0 }}
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
