// Import Dependencies
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

// Local Imports
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useDepositContext } from "app/contexts/deposit/context";
import { ResponsiveFilter } from "components/shared/table/ResponsiveFilter";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "components/ui";

// ----------------------------------------------------------------------

export function TableConfig({ table }) {
  const { smAndDown } = useBreakpointsContext();
  const { deposits } = useDepositContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = () => {
    table.options.meta.handleReload();
  };

  return (
    <Button
      onClick={() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
        handleReload();
      }}
      className={clsx("h-9 gap-2 whitespace-nowrap px-2.5 text-xs")}
    >
      <ArrowPathIcon className={`${isLoading && "animate-spin"} size-4`} />
    </Button>
  );

  // return (
  //   <div>
  //     <ResponsiveFilter
  //       buttonContent={
  //         <>
  //           <ArrowPathIcon onClick={handleReload} className="size-4" />
  //           {/* <span>View</span> */}
  //         </>
  //       }
  //     >
  //       {/* {smAndDown ? (
  //       <div className="mx-auto flex h-12 w-full shrink-0 items-center justify-between border-b border-gray-200 px-3 dark:border-dark-500">
  //         <p className="truncate text-start text-base font-medium text-gray-800 dark:text-dark-50">
  //           Table View
  //         </p>
  //       </div>
  //     ) : (
  //       <h3 className="px-3 pt-2.5 text-sm+ font-medium tracking-wide text-gray-800 dark:text-dark-100">
  //         Table View
  //       </h3>
  //     )} */}

  //       {/* <div className="flex flex-col max-sm:overflow-hidden sm:w-64">
  //       <TableSettings table={table} />
  //     </div> */}
  //     </ResponsiveFilter>
  //   </div>
  // );
}

TableConfig.propTypes = {
  table: PropTypes.object,
};
