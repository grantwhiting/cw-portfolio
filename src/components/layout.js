import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import SideNav from "./sideNav";
import FilterProvider from "../contexts/filter-provider";

const Layout = ({ children }) => {
  const navWidth = "230px";

  return (
    <FilterProvider>
      <Helmet>
        <title>Courtney Whiting's Portfolio</title>
        <link
          href="https://use.typekit.net/oov2wcw.css"
          rel="stylesheet"
        ></link>
      </Helmet>
      <div className="flex h-screen">
        <section
          className="flex-shrink-0 h-screen pt-10 overflow-y-auto"
          style={{ width: navWidth }}
        >
          <SideNav />
        </section>
        <section className="flex flex-col flex-grow">
          <main className="flex-grow w-full px-4 pt-12 pb-12 m-auto overflow-y-auto max-w-screen-desk">
            {children}
          </main>
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
