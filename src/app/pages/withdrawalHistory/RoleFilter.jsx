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
      className="flex w-[100%] overflow-auto rounded-md bg-gray-200 px-3 py-2 text-xs+ text-gray-800 dark:bg-dark-700 dark:text-dark-200 md:w-[65%]"
    >
      <Button
        data-tab-item
        onClick={() => column.setFilterValue("")}
        className={clsx(
          "min-w-[10%] shrink-0 whitespace-nowrap rounded px-5 py-2 text-base font-medium",
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
          onClick={() => column.setFilterValue(option.siteurl)}
          key={option.id}
          className={clsx(
            "flex min-w-[10%] shrink-0 flex-col whitespace-nowrap rounded px-5 py-2 text-xs font-medium",
            selectedValue === option.siteurl
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
          <p>{option.siteurl?.replace(/^https?:\/\//, "").toUpperCase()}</p>
          <p>{option.id}</p>
        </Button>
      ))}
    </div>
  );
}

RoleFilter.propTypes = {
  column: PropTypes.object,
  options: PropTypes.array,
};
