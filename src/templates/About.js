import * as React from "react";

const About = ({ pageContext }) => {
  console.log(pageContext);
  const { content } = pageContext;

  return <div>About Page!</div>;
};

export default About;
