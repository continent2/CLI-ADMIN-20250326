// Import Dependencies
import PropTypes from "prop-types";
import clsx from "clsx";
import { NavLink, useLocation, useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

// Local Imports
import { Badge } from "components/ui";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { JWT_HOST_API } from "configs/auth.config";

// ----------------------------------------------------------------------

export function MenuItem({ data }) {

  const { Icon, path, id, transKey } = data;
  const { lgAndDown } = useBreakpointsContext();
  const { close } = useSidebarContext();
  const { t } = useTranslation();
  const [depositIndicator, setDepositIndicator] = useState({ isOn: false, color: '#00FFFFFF', count: 0 });
  const location = useLocation();

  const title = t(transKey) || data.title;
  const info = useRouteLoaderData("root")?.[id]?.info;
  const isDepositItem = id === "deposit" || path.includes("/deposit");

  useEffect(() => {
    if (isDepositItem) {
      const fetchDepositIndicator = async () => {
        try {
          // Get the auth token from localStorage
          const authToken = localStorage.getItem("authToken");

          // Make the request with the authorization header
          const { data } = await axios.get(`${JWT_HOST_API}/agency/update`, {
            headers: {
              Authorization: authToken
            }
          });

          setDepositIndicator({
            isOn: data.updatedata.isdepositlighton || false,
            color: data.updatedata.isdepositlighcolor || '#00FFFFFF',
            count: data.updatedata.countdeposit
          });
        } catch (error) {
          console.error("Failed to fetch deposit indicator status:", error);
        }
      };

      fetchDepositIndicator();
    }
  }, [isDepositItem]);

  const handleMenuItemClick = () => {
    lgAndDown && close()
    if (location.pathname === path) {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div className="relative flex px-3">
      <NavLink
        to={path}
        onClick={handleMenuItemClick}
        className={({ isActive }) =>
          clsx(
            "group min-w-0 flex-1 rounded-md px-3 py-2 font-medium outline-none transition-colors ease-in-out",
            isActive
              ? "text-primary-600 dark:text-primary-400"
              : "text-gray-800 hover:bg-gray-100 hover:text-gray-950 focus:bg-gray-100 focus:text-gray-950 dark:text-dark-200 dark:hover:bg-dark-300/10 dark:hover:text-dark-50 dark:focus:bg-dark-300/10",
          )
        }
      >
        {({ isActive }) => (
          <>
            <div
              data-menu-active={isActive}
              className="flex min-w-0 items-center justify-between gap-2 text-xs+ tracking-wide"
            >
              <div className="flex min-w-0 items-center gap-2 relative">
                {Icon && (
                  <Icon
                    className={clsx(
                      "size-5 shrink-0 stroke-[1.5]",
                      !isActive && "opacity-80 group-hover:opacity-100",
                    )}
                  />
                )}
                <span className="truncate">{title}</span>

                {/* Deposit indicator dot */}
                {isDepositItem && depositIndicator.isOn && (
                  <div
                    className="-right-2 top-0 size-2 rounded-full"
                    style={{ backgroundColor: depositIndicator.color }}
                  />
                )}
                {isDepositItem && depositIndicator.isOn && (
                  <div>({depositIndicator.count})</div>
                )}
              </div>
              {info && info.val && (
                <Badge
                  color={info.color}
                  variant="soft"
                  className="h-4.5 min-w-[1rem] shrink-0 p-[5px] text-tiny+"
                >
                  {info.val}
                </Badge>
              )}
            </div>
            {isActive && (
              <div className="absolute bottom-1 top-1 w-1 bg-primary-600 dark:bg-primary-400 ltr:left-0 ltr:rounded-r-full rtl:right-0 rtl:rounded-l-lg" />
            )}
          </>
        )}
      </NavLink>
    </div>
  );
}

MenuItem.propTypes = {
  data: PropTypes.object,
};
