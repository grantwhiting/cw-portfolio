import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import SideNav from "../components/side-nav";

const Layout = ({ children }) => {
  const navWidth = "230px";
  return (
    <>
      {/* <Helmet /> */}
      <div className="flex h-screen">
        <section
          className="flex-shrink-0 h-screen pt-10 overflow-y-auto bg-gray-100"
          style={{ width: navWidth }}
        >
          <SideNav />
        </section>
        <section className="flex flex-col flex-grow">
          <main className="flex-grow w-full px-4 pb-12 m-auto overflow-y-auto max-w-screen-desk">
            {children}
          </main>
          {/* <Footer /> */}
        </section>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
