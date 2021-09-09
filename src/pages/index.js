import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useLocation, globalHistory } from "@reach/router";
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

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Index = () => {
  const location = useLocation();
  const [currentFilter, setCurrentFilter] = useState("all");

  useEffect(() => {
    return globalHistory.listen(({ location: { search } }) => {
      setCurrentFilter(search.substr(1).replace("filter=", ""));
    });
  }, [location]);

  const showItem = (item) =>
    parseInt(currentFilter, 10) === item.filter || currentFilter === "all";

  return (
    <Layout location={location}>
      <div className="masonry-columns">
        {mockData.map(
          (item, i) =>
            showItem(item) && (
              <div
                key={i}
                className="relative w-full mb-3 mr-3 bg-gray-50 break-inside-avoid"
                style={{ height: randomIntFromInterval(250, 450) }}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  project {i}
                </span>
              </div>
            )
        )}
      </div>
    </Layout>
  );
};

export default Index;
