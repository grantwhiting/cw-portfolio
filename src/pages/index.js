import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const HomePage = () => {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        {Array.from(Array(15)).map((_, i) => (
          <div key={i} className="relative bg-gray-50 aspect-ratio-16/9">
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              project {i}
            </span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
