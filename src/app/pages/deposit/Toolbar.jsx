// Import Dependencies
import {
    MagnifyingGlassIcon,

} from "@heroicons/react/24/outline";
import clsx from "clsx";

import PropTypes from "prop-types";

// Local Imports
import { Input} from "components/ui";
import {useBreakpointsContext} from "app/contexts/breakpoint/context";
import {TableConfig} from "./TableConfig";
import {rolesOptions} from "./data";
import {RoleFilter} from "./RoleFilter";
import { DateFilter } from "components/shared/table/DateFilter";

// ----------------------------------------------------------------------

export function Toolbar({table}) {
    const {isXs} = useBreakpointsContext();
    const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;

    return (
        <div className="table-toolbar">
            <div
                className={clsx(
                    "transition-content flex items-center justify-between space-x-4 rtl:space-x-reverse",
                    isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x] pt-4",
                )}
            >
                <div className="min-w-0">
                    <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
                        Users Table
                    </h2>
                </div>
            </div>

            {isXs ? (
                <>
                    <div
                        className={clsx(
                            "flex space-x-2 pt-4 rtl:space-x-reverse [&_.input-root]:flex-1",
                            isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
                        )}
                    >
                        <SearchInput table={table}/>
                        <TableConfig table={table}/>
                    </div>
                    <div
                        className={clsx(
                            "hide-scrollbar flex shrink-0 space-x-2 overflow-x-auto pb-1 pt-4 rtl:space-x-reverse",
                            isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
                        )}
                    >
                        {table.getColumn("role") && (
                            <RoleFilter
                                column={table.getColumn("role")}
                                options={rolesOptions}
                            />
                        )}
                    </div>
                </>
            ) : (
                <div
                    className={clsx(
                        "custom-scrollbar transition-content flex justify-between space-x-4 overflow-x-auto pb-1 pt-4 rtl:space-x-reverse",
                        isFullScreenEnabled ? "px-4 sm:px-5" : "px-[--margin-x]",
                    )}
                    style={{
                        "--margin-scroll": isFullScreenEnabled
                            ? "1.25rem"
                            : "var(--margin-x)",
                    }}
                >
                    {table.getColumn("site") && (
                        <RoleFilter
                            column={table.getColumn("site")}
                            options={rolesOptions}
                        />
                    )}

                    <div className="flex shrink-0 space-x-2 rtl:space-x-reverse">
                        <SearchInput table={table}/>
                        {table.getColumn("date") && (
                            <DateFilter
                                column={table.getColumn("date")}
                                title="Date"
                                config={{
                                    maxDate: new Date().fp_incr(1),
                                    mode: "range",
                                }}
                            />
                        )}
                        <TableConfig table={table}/>
                    </div>
                </div>
            )}
        </div>
    );
}

function SearchInput({table}) {
    return (
        <Input
            value={table.getState().globalFilter}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            prefix={<MagnifyingGlassIcon className="size-4"/>}
            classNames={{
                root: "shrink-0",
                input: "text-xs ring-primary-500/50 focus:ring",
            }}
            placeholder="Search Name, Member Id..."
        />
    );
}


Toolbar.propTypes = {
    table: PropTypes.object,
};

SearchInput.propTypes = {
    table: PropTypes.object,
};

