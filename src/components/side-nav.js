import React from "react";
import { Link } from "gatsby";

const SideNavItem = ({ children }) => {
  return (
    <li>
      <Link className="flex items-center h-5 px-2 py-1 text-left" to="#">
        {children}
      </Link>
    </li>
  );
};

const SideNav = ({ navItems, children }) => {
  return (
    <>
      {Array.from(Array(4)).map((_, i) => (
        <SideNavItem key={i}>Item {i}</SideNavItem>
      ))}
    </>
  );
};

export default SideNav;
