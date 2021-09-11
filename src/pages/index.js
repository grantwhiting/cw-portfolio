import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useLocation, globalHistory } from "@reach/router";
import { getRandomIntFromInterval, getFilterParam } from "../functions/helpers";
import { graphql, Link } from "gatsby";

const Index = ({ data }) => {
  const location = useLocation();
  const [currentFilter, setCurrentFilter] = useState("all");
  const { allWpProject } = data;

  console.log(allWpProject.nodes);

  useEffect(() => {
    return globalHistory.listen(({ location: { search } }) => {
      setCurrentFilter(getFilterParam(search));
    });
  }, [location]);

  const showItem = (item) =>
    parseInt(currentFilter, 10) === item.filter || currentFilter === "all";

  return (
    <Layout location={location}>
      <div className="masonry-columns">
        {allWpProject.nodes.map(
          (project) =>
            showItem(project) && (
              <Link
                to={project.uri}
                key={project.id}
                className="relative block w-full mb-3 mr-3 bg-gray-50 break-inside-avoid"
                style={{ height: getRandomIntFromInterval(250, 450) }}
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {project.title}
                </span>
              </Link>
            )
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
    allWpProject {
      nodes {
        id
        title
        uri
        featuredImage {
          node {
            guid
          }
        }
      }
    }
  }
`;

export default Index;
