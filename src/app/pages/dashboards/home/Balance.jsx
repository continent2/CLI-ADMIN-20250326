import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

// Local Imports
import { Button, CopyButton } from "components/ui";
import { formatNumberWithCommas } from "utils/formatNumberWithCommas";

// ----------------------------------------------------------------------

export function Balance({ data }) {
  // Optional fallback if data is still loading or undefined
  const depositToday = Number(data?.amount_deposit_today)?.toFixed(0) || 0;
  const withdrawToday = Number(data?.amount_withdraw_today)?.toFixed(0) || 0;
  const depositTodayInQuote =
    Number(data?.amount_deposit_today_in_quote)?.toFixed(0) || 0;
  const withdrawTodayInQuote =
    Number(data?.amount_withdraw_today_in_quote)?.toFixed(0) || 0;
  const withdrawableAmountQuote =
    Number(data?.withdrawable?.withdrawableamount_in_quote)?.toFixed(0) || 0;
  const withdrawableAmount =
    Number(data?.withdrawable?.withdrawableamount)?.toFixed(0) || 0;

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

            <CopyButton value={data?.address_recent_used}>
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
          <div className="mt-3 text-nowrap text-3xl font-semibold">
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
            <div className="mt-1 flex flex-nowrap items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black/20">
                <ArrowRightIcon className="size-4" />
              </div>
              <p className="flex flex-nowrap gap-1 text-nowrap text-[11px] font-medium">
                {formatNumberWithCommas(depositToday)} <p>USDT</p>
              </p>
              {/** <p className="text-base font-medium">₩{depositToday}</p>*/}
            </div>
            <Button
              unstyled
              className="mt-3 flex w-full flex-nowrap items-center gap-1 text-nowrap rounded-lg border border-white/10 bg-white/20 px-5 py-2 text-white hover:bg-white/30 focus:bg-white/30 active:bg-white/25"
            >
              {/* 입금{" "} */}₩ {formatNumberWithCommas(depositTodayInQuote)}
            </Button>
          </div>

          {/* Expense */}
          <div>
            <p className="text-white/90">당일 출금액</p>
            <div className="mt-1 flex flex-nowrap items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-full bg-black/20">
                <ArrowRightIcon className="size-4" />
              </div>
              <p className="flex flex-nowrap gap-1 text-nowrap text-[11px] font-medium">
                {formatNumberWithCommas(withdrawToday)}
                <p>USDT</p>
              </p>
              {/** <p className="text-base font-medium">₩{withdrawToday}</p> */}
            </div>
            <Button
              unstyled
              className="mt-3 flex w-full flex-nowrap items-center gap-1 text-nowrap rounded-lg border border-white/10 bg-white/20 px-5 py-2 text-white hover:bg-white/30 focus:bg-white/30 active:bg-white/25"
            >
              {/* 출금 */}₩ {formatNumberWithCommas(withdrawTodayInQuote)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
