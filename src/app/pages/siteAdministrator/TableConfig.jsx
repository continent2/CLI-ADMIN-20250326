// Import Dependencies
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

// Local Imports
import clsx from "clsx";
import { Button } from "components/ui";
import { useState } from "react";
import { useSiteContext } from "app/contexts/site/context";
import { useAdminUserContext } from "app/contexts/adminUser/context";

// ----------------------------------------------------------------------

export function TableConfig({ table }) {
  const { adminUsers } = useAdminUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = () => {
    // Call the deposits function with the same parameters you used initially
    adminUsers({
      offSet: 0, // Your initial offset
      limit: 20, // Your initial limit
      searchKey: "", // Your initial search key if any
      timeStartIso: "", // Your initial time start if any
      timeEndIso: "", // Your initial time end if any
      siteId: "", // Your initial site ID if any
    });
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
