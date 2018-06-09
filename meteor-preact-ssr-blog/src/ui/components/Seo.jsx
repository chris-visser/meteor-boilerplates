import { h } from 'preact';
import Helmet from "preact-helmet";

export default (props = {}) => (
  <Helmet
    htmlAttributes={{ lang: "en", amp: undefined }} // amp takes no value
    title="Problem solver & Software Developer"
    titleTemplate="Chris Visser | %s"
    defaultTitle="Problem solver / Software Architect"
    titleAttributes={{ itemprop: "name", lang: "en" }}
    meta={[
      {
        name: "description",
        content: "Focused on solving real world problems using my extensive software experience, out of the box mindset and intrinsic motivation."
      },
      { property: "og:type", content: "article" }
    ]}
    {...props}
  />
);