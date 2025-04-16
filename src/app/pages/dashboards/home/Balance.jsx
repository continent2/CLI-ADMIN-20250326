// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  DocumentDuplicateIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment } from "react";
import { toast } from "sonner";

// Local Imports
import { Button, CopyButton } from "components/ui";
import { formatNumberWithCommas } from "utils/formatNumberWithCommas";

// ----------------------------------------------------------------------

export function Balance({ data }) {
  // Optional fallback if data is still loading or undefined
  const depositToday = data?.amount_deposit_today_in_quote?.toFixed(2) || 0;
  const withdrawToday = data?.amount_withdraw_today_in_quote?.toFixed(2) || 0;
  const withdrawableAmountQuote =
    data?.withdrawable?.withdrawableamount_in_quote || 0;
  const withdrawableAmount = data?.withdrawable?.withdrawableamount || 0;

  return (
    <div className="rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 px-4 pb-4 text-white sm:px-5">
      <div className="flex items-center justify-between py-3">
        <h2 className="text-sm+ font-medium tracking-wide">현재 잔액</h2>
        {/* <ActionMenu /> */}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6">
        <div>
          <div className="flex w-9/12 items-center gap-1">
            <p className="truncate text-xs text-white/80">
              {data?.address_recent_used}{" "}
              {/* 0x9CDBC28F0A6C13BB42ACBD3A3B366BFCAB07B8B1 */}
            </p>

            <CopyButton value="0x9CDBC28F0A6C13BB42ACBD3A3B366BFCAB07B8B1">
              {({ copied, copy }) => {
                copied && toast.success("Your Wallet Address copied");
                return (
                  <Button
                    unstyled
                    onClick={copy}
                    className="size-5 shrink-0 rounded-full hover:bg-white/20 focus:bg-white/20 active:bg-white/25"
                  >
                    <DocumentDuplicateIcon className="size-3.5" />
                  </Button>
                );
              }}
            </CopyButton>
          </div>

          {/* Display dynamic balance */}
          <div className="mt-3 text-3xl font-semibold">
            {/** ₩{withdrawableAmount}*/}
            {formatNumberWithCommas(withdrawableAmount)} USDT
          </div>
          <p className="mt-2 text-xs+ text-white/80">
            ₩ {formatNumberWithCommas(withdrawableAmountQuote)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {/* Income */}
          <div>
            <p className="text-white/90">당일 입금액</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black/20">
                <ArrowRightIcon className="size-4" />
              </div>
              <p className="text-[11px] font-medium">
                {formatNumberWithCommas(depositToday)} <p>USDT</p>
              </p>
              {/** <p className="text-base font-medium">₩{depositToday}</p>*/}
            </div>
            <Button
              unstyled
              className="mt-3 w-full rounded-lg border border-white/10 bg-white/20 px-5 py-2 text-white hover:bg-white/30 focus:bg-white/30 active:bg-white/25"
            >
              {/* 입금{" "} */}
              {formatNumberWithCommas(depositToday)} USDT
            </Button>
          </div>

          {/* Expense */}
          <div>
            <p className="text-white/90">당일 출금액</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black/20">
                <ArrowRightIcon className="size-4" />
              </div>
              <p className="text-[11px] font-medium">
                {formatNumberWithCommas(withdrawToday)}
                <p>USDT</p>
              </p>
              {/** <p className="text-base font-medium">₩{withdrawToday}</p> */}
            </div>
            <Button
              unstyled
              className="mt-3 w-full rounded-lg border border-white/10 bg-white/20 px-5 py-2 text-white hover:bg-white/30 focus:bg-white/30 active:bg-white/25"
            >
              {/* 출금 */}
              {formatNumberWithCommas(withdrawToday)} USDT
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionMenu() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left ltr:-mr-1.5 rtl:-ml-1.5"
    >
      <MenuButton
        as={Button}
        variant="flat"
        isIcon
        className="size-8 rounded-full"
      >
        <EllipsisHorizontalIcon className="size-5" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <MenuItems className="absolute z-[100] mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-none focus-visible:outline-none dark:border-dark-500 dark:bg-dark-700 dark:shadow-none ltr:right-0 rtl:left-0">
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-none transition-colors",
                  focus &&
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
                )}
              >
                <span>행동</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-none transition-colors",
                  focus &&
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
                )}
              >
                <span>또 다른 행동</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-none transition-colors",
                  focus &&
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
                )}
              >
                <span>기타 조치</span>
              </button>
            )}
          </MenuItem>

          <hr className="mx-3 my-1.5 h-px border-gray-150 dark:border-dark-500" />

          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-none transition-colors",
                  focus &&
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
                )}
              >
                <span>분리된 동작</span>
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
