// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import SearchIcon from "assets/dualicons/search.svg?react";
import { RightSidebar } from "components/template/RightSidebar";
import { LanguageSelector } from "components/template/LaguageSelector";
import { Notifications } from "components/template/Notifications";
import { Button } from "components/ui";
import { SidebarToggleBtn } from "components/shared/SidebarToggleBtn";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { Profile } from "../Profile";
import { Search } from "components/template/Search";
import { useThemeContext } from "app/contexts/theme/context";
import { Radio, RadioGroup } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline/index.js";
import { useLocation } from "react-router";

// ----------------------------------------------------------------------

export function Header() {
  const { smAndUp } = useBreakpointsContext();
  const { cardSkin } = useThemeContext();
  const { themeMode, setThemeMode } = useThemeContext();
  const { pathname } = useLocation();
  const allPathnames = [
    {
      path: "/",
      label: "대시보드",
    },
    {
      path: "/deposit",
      label: "입금 내역",
    },
    {
      path: "/member",
      label: "회원",
    },
    {
      path: "/site",
      label: "사이트",
    },
    {
      path: "/registerYourSite",
      label: "사이트 등록",
    },
    {
      path: "/withdrawalDetail",
      label: "출금 내역",
    },
    {
      path: "/withdrawalRequest",
      label: "출금 요청",
    },
    {
      path: "/siteAdministrator",
      label: "관리자",
    },
    {
      path: "/addSiteAdminstratorForm",
      label: "관리자 추가",
    },
    {
      path: "/setting",
      label: "설정",
    },
  ];

  const isWithdrawRequestPage = location.pathname === "/withdrawalRequest";

  return (
    <header
      className={clsx(
        "app-header transition-content sticky top-0 z-20 flex h-[65px] items-center gap-1 border-b border-gray-200 bg-white/80 px-[--margin-x] backdrop-blur backdrop-saturate-150 dark:border-dark-600 max-sm:justify-between",
        cardSkin === "bordered" ? "dark:bg-dark-900/80" : "dark:bg-dark-700/80",
      )}
    >
      <div className="contents xl:hidden">
        <SidebarToggleBtn />
      </div>

      <div className="flex items-center gap-2 sm:flex-1">
        <div className="flex-1">
          <h1 className="text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:text-2xl">
            {allPathnames.find((val) => val.path === pathname)?.label}
          </h1>

          {/* {isWithdrawRequestPage && ( */}
          {/*   <p className="text-gray-400"> */}
          {/*     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do */}
          {/*     eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut */}
          {/*     enim ad minim veniam, quis nostrud exercitation ullamco laboris */}
          {/*     nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in */}
          {/*     reprehenderit in voluptate velit esse cillum dolore eu fugiat */}
          {/*     nulla pariatur. Excepteur sint occaecat cupidatat non proident, */}
          {/*     sunt in culpa qui officia deserunt mollit anim id est laborum. */}
          {/*   </p> */}
          {/* )} */}
          {/* {pathname.includes("setting") ? (
            <h1 className="text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50 lg:text-2xl">
              설정
            </h1>
          ) : (
            <Search
              renderButton={(open) => (
                <>
                  {smAndUp && (
                    <button
                      onClick={open}
                      className="flex items-center gap-4 outline-none max-sm:hidden"
                    >
                      <div className="flex items-center gap-2">
                        <MagnifyingGlassIcon className="size-5" />
                        <span>여기에서 검색하세요...</span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="20"
                        aria-hidden="true"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          d="M3.5.5h12c1.7 0 3 1.3 3 3v13c0 1.7-1.3 3-3 3h-12c-1.7 0-3-1.3-3-3v-13c0-1.7 1.3-3 3-3z"
                          opacity="0.4"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M11.8 6L8 15.1h-.9L10.8 6h1z"
                        ></path>
                      </svg>
                    </button>
                  )}
                  <Button
                    onClick={open}
                    variant="flat"
                    isIcon
                    className="relative size-9 rounded-full sm:hidden"
                  >
                    <SearchIcon className="size-6 text-gray-900 dark:text-dark-100" />
                  </Button>
                </>
              )}
            />
          )} */}
        </div>
        <Notifications />
        <RightSidebar />
        {/* <LanguageSelector /> */}
        <Profile />
        <div>
          <RadioGroup
            value={themeMode}
            onChange={setThemeMode}
            className="flex w-max min-w-full rounded-3xl bg-gray-200 p-1 text-gray-600 dark:bg-dark-700 dark:text-dark-200"
          >
            <Radio
              value="light"
              className={({ checked }) =>
                clsx(
                  "flex-1 shrink-0 whitespace-nowrap rounded-3xl p-2 font-medium",
                  checked
                    ? "bg-white shadow dark:bg-dark-500 dark:text-dark-100"
                    : "hover:text-gray-800 focus:text-gray-800 dark:hover:text-dark-100 dark:focus:text-dark-100",
                )
              }
              as={Button}
              unstyled
            >
              <SunIcon className="size-5" />
            </Radio>
            <Radio
              value="dark"
              className={({ checked }) =>
                clsx(
                  "flex-1 shrink-0 whitespace-nowrap rounded-3xl p-2 font-medium",
                  checked
                    ? "bg-white shadow dark:bg-dark-500 dark:text-dark-100"
                    : "hover:text-gray-800 focus:text-gray-800 dark:hover:text-dark-100 dark:focus:text-dark-100",
                )
              }
              as={Button}
              unstyled
            >
              <MoonIcon className="size-5" />
            </Radio>
          </RadioGroup>
        </div>
      </div>
    </header>
  );
}
