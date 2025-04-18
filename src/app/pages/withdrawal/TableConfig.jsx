// Import Dependencies
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

// Local Imports
import clsx from "clsx";
import { Button } from "components/ui";
import { useState } from "react";
import { useWithdrawalDetailsContext } from "app/contexts/withdrawalDetails/context";

// ----------------------------------------------------------------------

export function TableConfig({ table }) {
  const { withdrawas } = useWithdrawalDetailsContext();
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
}

TableConfig.propTypes = {
  table: PropTypes.object,
};
