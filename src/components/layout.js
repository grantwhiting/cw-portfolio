import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import SideNav from "../components/side-nav";

const Layout = ({ children }) => {
  return (
    <>
      {/* <Helmet /> */}

      <div className="flex h-screen pt-9">
        <section
          className="flex-shrink-0 overflow-y-auto bg-gray-100"
          style={{ width: "278px" }}
        >
          <SideNav />
        </section>
        <section className="flex flex-col flex-grow overflow-y-auto">
          <main className="flex-grow w-full pb-12 m-auto max-w-screen-desk">
            {children}
          </main>
          {/* <Footer /> */}
        </section>
      </div>
    </>
  );
};

export default Layout;
