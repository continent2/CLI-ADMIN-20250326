// Import Dependencies
import clsx from "clsx";
import PropTypes from "prop-types";

// Local Imports
import { Button } from "components/ui";
import { createScopedKeydownHandler } from "utils/dom/createScopedKeydownHandler";
import { useState } from "react";

// ----------------------------------------------------------------------

export function RoleFilter({ table, options }) {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div
      data-tab
      className="custom-scrollbar flex max-w-[80%] overflow-x-auto overflow-y-hidden rounded-md bg-gray-200 px-3 py-[2px] text-xs text-gray-800 dark:bg-dark-700 dark:text-dark-200"
    >
      <Button
        data-tab-item
        onClick={() => {
          setSelectedValue("");
          table.options?.meta.handleSiteChange("");
        }}
        className={clsx(
          "min-w-[10%] shrink-0 whitespace-nowrap rounded px-1 py-1 text-xs font-medium",
          selectedValue === ""
            ? "bg-white shadow dark:bg-dark-500 dark:text-dark-100"
            : "hover:text-gray-900 focus:text-gray-900 dark:hover:text-dark-100 dark:focus:text-dark-100",
        )}
        unstyled
        onKeyDown={createScopedKeydownHandler({
          siblingSelector: "[data-tab-item]",
          parentSelector: "[data-tab]",
          activateOnFocus: true,
          loop: false,
          orientation: "horizontal",
        })}
      >
        All
      </Button>
      {Array.isArray(options) &&
        options.map((option) => {
          if (!option.siteurl) return null; // Skip if siteurl is empty or falsy

          return (
            <Button
              data-tab-item
              onClick={() => {
                setSelectedValue(option.id);
                table.options?.meta.handleSiteChange(option.id);
              }}
              key={option.id}
              className={clsx(
                "flex min-w-[10%] shrink-0 gap-1 whitespace-nowrap rounded px-5 text-xs font-medium",
                selectedValue === option.id
                  ? "bg-white shadow dark:bg-dark-500 dark:text-dark-100"
                  : "hover:text-gray-900 focus:text-gray-900 dark:hover:text-dark-100 dark:focus:text-dark-100",
              )}
              unstyled
              onKeyDown={createScopedKeydownHandler({
                siblingSelector: "[data-tab-item]",
                parentSelector: "[data-tab]",
                activateOnFocus: true,
                loop: false,
                orientation: "horizontal",
              })}
            >
              <p>{option.siteurl.replace(/^https?:\/\//, "").toUpperCase()}</p>
              <p> ({option.id})</p>
            </Button>
          );
        })}
    </div>
  );
}

RoleFilter.propTypes = {
  table: PropTypes.object,
  options: PropTypes.array,
};
