// Import Dependencies

import { CheckIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Local Imports
import { Avatar, Badge, Swap, SwapOff, SwapOn } from "components/ui";
import { rolesOptions } from "./data";
import { Highlight } from "components/shared/Highlight";
import { useLocaleContext } from "app/contexts/locale/context";
import { ensureString } from "utils/ensureString";

// ----------------------------------------------------------------------

export function NameCell({ row, getValue, column, table }) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const columnQuery = ensureString(column.getFilterValue());

  return (
    <div className="flex items-center space-x-3 ltr:-ml-1 rtl:-mr-1 rtl:space-x-reverse">
      <Swap
        effect="flip"
        disabled={!row.getCanSelect()}
        onChange={(val) => row.toggleSelected(val === "on")}
        value={row.getIsSelected() ? "on" : "off"}
      >
        <SwapOn className="flex size-10 items-center justify-center p-1">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-primary-500">
            <CheckIcon className="size-5 text-white" />
          </div>
        </SwapOn>
        <SwapOff>
          <Avatar
            size={10}
            classNames={{
              root: "rounded-full border-2 border-dashed border-transparent p-0.5 transition-colors group-hover/tr:border-gray-400 dark:group-hover/tr:border-dark-300",
              display: "text-xs+",
            }}
            src={row.original.avatar}
            initialColor="auto"
            name={row.original.name}
          />
        </SwapOff>
      </Swap>

      <div className="font-medium text-gray-800 dark:text-dark-100">
        <Highlight query={[globalQuery, columnQuery]}>{getValue()}</Highlight>
      </div>
    </div>
  );
}

export function SiteCell({ getValue }) {
  const val = getValue();
  const option = rolesOptions.find((item) => item.value === val);

  return (
    <Badge color={option.color} variant="outlined">
      {option.label}
    </Badge>
  );
}

export function DateCell({ getValue }) {
    const { locale } = useLocaleContext();
    const timestapms = getValue();
    const date = dayjs(timestapms).locale(locale).format("DD MMM YYYY");
    const time = dayjs(timestapms).locale(locale).format("hh:mm A");
    return (
        <>
            <p className="font-medium">{date}</p>
            <p className="mt-0.5 text-xs text-gray-400 dark:text-dark-300">{time}</p>
        </>
    );
}

NameCell.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};

SiteCell.propTypes = {
  getValue: PropTypes.func,
};

DateCell.propTypes = {
    getValue: PropTypes.func,
};




