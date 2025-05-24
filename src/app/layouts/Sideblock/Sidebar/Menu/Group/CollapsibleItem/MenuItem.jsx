// Import Dependencies
import PropTypes from "prop-types";
import clsx from "clsx";
import { NavLink, useLocation, useRouteLoaderData } from "react-router";
import { useTranslation } from "react-i18next";

// Local Imports
import { Badge } from "components/ui";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { useEffect } from "react";

// ----------------------------------------------------------------------

export function MenuItem({ data }) {
  const { id, transKey, path } = data;
  const { t } = useTranslation();
  const { lgAndDown } = useBreakpointsContext();
  const { close } = useSidebarContext();
  const [depositIndicator, setDepositIndicator] = useState({ isOn: false, color: '#00FFFFFF', count: 0 });
  const location = useLocation()

  const title = t(transKey) || data.title;
  const info = useRouteLoaderData("root")?.[id]?.info;
  const isDepositItem = id === "deposit" || path.includes("/deposit");
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

  useEffect(() => {
    if (isDepositItem) {

      const interval = setInterval(() => {
        fetchDepositIndicator();
      }, 5000);
      fetchDepositIndicator();
    }
  }, [isDepositItem]);

  const handleMenuItemClick = () => {
    lgAndDown && close()
    fetchDepositIndicator();
    if (location.pathname === path) {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div className="relative flex">
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
          <div
            data-menu-active={isActive}
            className="flex min-w-0 items-center justify-between gap-2.5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={clsx(
                  isActive
                    ? "bg-primary-600 opacity-80 dark:bg-primary-400"
                    : "opacity-50 transition-all",
                  "size-2 rounded-full border border-current",
                )}
              />
              <span className="truncate">{title}</span>

              {isDepositItem && (
                <div
                  className="-right-2 top-0 size-2 rounded-full"
                  style={{ backgroundColor: depositIndicator.color }}
                />
              )}
              {isDepositItem && depositIndicator.count > 0 && (
                <div>({depositIndicator.count})</div>
              )}

            </div>
            {info && info.val && (
              <Badge
                color={info.color}
                className="h-5 min-w-[1.25rem] shrink-0 rounded-full p-[5px]"
              >
                {info.val}
              </Badge>
            )}
          </div>
        )}
      </NavLink>
    </div>
  );
}

MenuItem.propTypes = {
  data: PropTypes.object.isRequired,
};
