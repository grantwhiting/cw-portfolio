import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import SideNav from "../components/side-nav";
import { FiltersProvider } from "../contexts/filters-context";

const Layout = ({ children }) => {
  return (
    <FiltersProvider initialFilters={[0, 1, 2, 3, 4]}>
      {/* <Helmet /> */}
      <div className="flex h-screen">
        <section
          className="flex-shrink-0 pt-10 overflow-y-auto bg-gray-100"
          style={{ width: "278px" }}
        >
          <SideNav />
        </section>
        <section className="flex flex-col flex-grow overflow-y-auto">
          <main className="flex-grow w-full px-4 pb-12 m-auto max-w-screen-desk">
            {children}
          </main>
          {/* <Footer /> */}
        </section>
      </div>
    </FiltersProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
