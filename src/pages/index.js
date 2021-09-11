import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { useLocation, globalHistory } from "@reach/router";
import { getRandomIntFromInterval, getFilterParam } from "../functions/helpers";
import { graphql, Link } from "gatsby";

const Index = ({ data }) => {
  const location = useLocation();
  const [currentFilter, setCurrentFilter] = useState("all");
  const { allWpProject } = data;

  useEffect(() => {
    return globalHistory.listen(({ location: { search } }) => {
      setCurrentFilter(getFilterParam(search));
    });
  }, [location]);

  const getCategoryNames = (categories) =>
    categories.map((category) => category.name);

  const showProject = (categories) =>
    getCategoryNames(categories).includes(decodeURI(currentFilter)) ||
    currentFilter === "all";

  return (
    <Layout location={location}>
      <div className="masonry-columns">
        {allWpProject.nodes.map(
          (project) =>
            showProject(project.categories.nodes) && (
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
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export default Index;
