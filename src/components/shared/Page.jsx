// Import Dependencies
import PropTypes from "prop-types";
import { Fragment } from "react";

// Local Imports
import { useDocumentTitle } from "hooks";

// ----------------------------------------------------------------------

const Page = ({ title = "", component = Fragment, children }) => {
  const Component = component;
  useDocumentTitle(title );
  return <Component>{children}</Component>;
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  component: PropTypes.elementType,
};

export { Page };
