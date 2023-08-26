import { AnimatePresence } from "framer-motion";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { client } from "./src/contexts/apollo-context";

import "./src/scss/index.scss";

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
);

export const wrapPageElement = ({ element }) => (
  <AnimatePresence mode="wait" initial={false}>
    {element}
  </AnimatePresence>
);
