import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { navigate, useLocation, globalHistory } from "@reach/router";
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
  const loc = useLocation();
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    return globalHistory.listen(({ location: { search } }) => {
      setCurrentFilter(search.substr(1).replace("filter=", ""));
    });
  }, [loc]);

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-4">
        {mockData.map((item, i) => (
          <div
            key={i}
            className="relative bg-gray-50 aspect-ratio-16/9"
            hidden={
              parseInt(currentFilter, 10) !== item.filter &&
              currentFilter !== "all"
            }
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
