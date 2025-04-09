// Import Dependencies
import clsx from "clsx";
import PropTypes from "prop-types";

// Local Imports
import { Button } from "components/ui";
import { createScopedKeydownHandler } from "utils/dom/createScopedKeydownHandler";

// ----------------------------------------------------------------------

export function RoleFilter({ column, options }) {
  const selectedValue = column?.getFilterValue() || "";

  return (
    <div
      data-tab
      className="flex rounded-md overflow-auto w-[100%] md:w-[65%] bg-gray-200 px-3 py-2 text-xs+ text-gray-800 dark:bg-dark-700 dark:text-dark-200"
    >
      <Button
        data-tab-item
        onClick={() => column.setFilterValue("")}
        className={clsx(
          "shrink-0 whitespace-nowrap rounded min-w-[10%] text-base px-5 py-2 font-medium",
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
      {options.map((option) => (
        <Button
          data-tab-item
          onClick={() => column.setFilterValue(option.value)}
          key={option.value}
          className={clsx(
            "shrink-0 whitespace-nowrap rounded text-base min-w-[10%] px-5 py-2 font-medium",
            selectedValue === option.value
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
          {option.label}
        </Button>
      ))}
    </div>
  );
}

RoleFilter.propTypes = {
  column: PropTypes.object,
  options: PropTypes.array,
};
