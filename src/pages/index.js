import React from "react";
import Layout from "../components/layout";
import { navigate, useLocation } from "@reach/router";
import { graphql } from "gatsby";

const mockData = [
  { filter: 0 },
  { filter: 0 },
  { filter: 0 },
  { filter: 0 },
  { filter: 0 },
  { filter: 1 },
  { filter: 1 },
  { filter: 1 },
  { filter: 1 },
  { filter: 1 },
  { filter: 2 },
  { filter: 2 },
  { filter: 2 },
  { filter: 2 },
  { filter: 2 },
  { filter: 3 },
  { filter: 3 },
  { filter: 3 },
  { filter: 3 },
  { filter: 3 },
  { filter: 4 },
  { filter: 4 },
  { filter: 4 },
  { filter: 4 },
  { filter: 4 },
];

const Index = () => {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        {mockData.map((item, i) => (
          <div
            key={i}
            className="relative bg-gray-50 aspect-ratio-16/9"
            data-filter-type={item.filter}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              project {i}
            </span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Index;
