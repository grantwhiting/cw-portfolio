import React from "react";
import { ApolloProvider } from "react-apollo";
import { client } from "./src/contexts/apollo-context";

import "./src/scss/index.scss";

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);
