// Import Dependencies
import { UserIcon } from "@heroicons/react/20/solid";
import {
  ArrowsRightLeftIcon,
  BoltIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";

// Local Imports
import { useLocaleContext } from "app/contexts/locale/context";
import { Avatar } from "components/ui";
import { isKoreanFormat } from "utils/formatNumber";

// ----------------------------------------------------------------------

const activityColor = {
  "utility-payment": "info",
  "property-coverage": "primary",
  personal: "warning",
};

export function DateCell({ row }) {
  const { locale } = useLocaleContext();
  // const createdDate = row?.original?.["agency.createdat"];
  const createdDate = row?.original?.["createdat"];
  const updatedDate = row?.original?.["agency.updatedat"];
  const dateFormat = isKoreanFormat ? 'YYYY년MM월DD일' : 'YYYY-MM-DD';

  const formattedCreatedDate = createdDate
    ? `${dayjs(createdDate).locale(locale).format(dateFormat)} | ${dayjs(createdDate).locale(locale).format("HH:mm:ss")}`
    : "N/A";

  const formattedUpdatedDate = updatedDate
    ? `${dayjs(updatedDate).locale(locale).format(dateFormat)} | ${dayjs(updatedDate).locale(locale).format("HH:mm:ss")}`
    : "N/A";

  return (
    <div>
      <p>{formattedCreatedDate}</p>
      {/* <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> 
      <p>{formattedUpdatedDate}</p> */}
    </div>
  );
}

function getActivityIcon(type) {
  if (type === "utility-payment") return ShieldExclamationIcon;
  if (type === "property-coverage") return BoltIcon;
  if (type === "personal") return UserIcon;
  return ArrowsRightLeftIcon;
}

export function ActivityCell({ row, getValue }) {
  const Icon = getActivityIcon(row.original.activity_type.key);

  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <Avatar
        classNames={{ display: "rounded-lg" }}
        initialColor={activityColor[row.original.activity_type.key]}
        size={9}
      >
        <Icon className="size-5" />
      </Avatar>

      <div>
        <p className="truncate font-medium text-gray-800 dark:text-dark-100">
          {getValue()}
        </p>
        <p className="mt-0.5 text-xs text-gray-400 dark:text-dark-300">
          {row.original.activity_type.title}
        </p>
      </div>
    </div>
  );
}

export function AccountNameCell({ getValue }) {
  return (
    <span className="font-medium text-gray-800 dark:text-dark-100">
      {getValue()} Wallet
    </span>
  );
}

export function TransactionDateCell({ getValue }) {
  const { locale } = useLocaleContext();
  return (
    <span>
      {dayjs(getValue()).locale(locale).format("ddd, DD MMM - HH:mm")}
    </span>
  );
}

export function AmountCell({ row, getValue }) {
  const val = getValue();

  return (
    <span
      className={clsx(
        "font-semibold",
        val > 0
          ? "text-success dark:text-success-light"
          : "text-error dark:text-error-light",
      )}
    >
      {val} {row.original.account_name}
    </span>
  );
}

DateCell.propTypes = {
  row: PropTypes.object,
};

ActivityCell.propTypes = {
  row: PropTypes.object,
  getValue: PropTypes.func,
};

AccountNameCell.propTypes = {
  getValue: PropTypes.func,
};

TransactionDateCell.propTypes = {
  getValue: PropTypes.func,
};

AmountCell.propTypes = {
  row: PropTypes.object,
  getValue: PropTypes.func,
};
