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
            className="flex rounded-md overflow-auto bg-gray-200 px-3 py-2 text-xs+ text-gray-800 dark:bg-dark-700 dark:text-dark-200 max-w-[80%]"
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
            {Array.isArray(options) && options.map((option) => {
                if (!option.siteurl) return null; // Skip if siteurl is empty or falsy

                return (
                    <Button
                        data-tab-item
                        onClick={() => column.setFilterValue(option.siteurl)}
                        key={option.id}
                        className={clsx(
                            "shrink-0 whitespace-nowrap rounded text-xs min-w-[10%] px-5 py-2 font-medium",
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
                        {option.siteurl.replace(/^https?:\/\//, '').toUpperCase()}
                    </Button>
                );
            })}
        </div>
    );
}

RoleFilter.propTypes = {
    column: PropTypes.object,
    options: PropTypes.array,
};
