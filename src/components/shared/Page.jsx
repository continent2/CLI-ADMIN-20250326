// Import Dependencies
import PropTypes from "prop-types";
import { Fragment } from "react";

// Local Imports
import { useDocumentTitle } from "hooks";

// ----------------------------------------------------------------------

const Page = ({ title = "", subTitle = "", component = Fragment, children }) => {
  const Component = component;
  useDocumentTitle(title );
  return <Component className="space-y-2">{children} <p>{subTitle}</p></Component>;
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  component: PropTypes.elementType,
};

export { Page };
