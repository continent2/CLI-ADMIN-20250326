// Import Dependencies
import PropTypes from "prop-types";
import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";

// Local Imports
import { Button } from "components/ui";
import { useClipboard } from "hooks";
import { ensureString } from "utils/ensureString";
import { Highlight } from "../Highlight";

// ----------------------------------------------------------------------

export function CopyableCell({ getValue, table, highlight }) {
  const val = getValue();
  const { copied, copy } = useClipboard({ timeout: 2000 });
  const query = ensureString(table.getState()?.globalFilter);

  return (
    <div className="flex space-x-1 rtl:space-x-reverse">
      <span>
        {highlight ? <Highlight query={query}>{val}</Highlight> : val}
      </span>

      <Button
        data-tooltip
        data-tooltip-content={copied ? "Copied" : "Copy"}
        onClick={(e) => {
            e.stopPropagation(); //  prevents parent click
            copy(val);
        }}
        isIcon
        variant="flat"
        className="size-5 rounded-full opacity-0 group-hover/td:opacity-100"
        aria-label="Copy Button"
      >
        <DocumentDuplicateIcon className="size-3.5" />
      </Button>
    </div>
  );
}

export function CopyableCellWithClick({ getValue, table, highlight, onClick }) {
    const val = getValue();
    const { copied, copy } = useClipboard({ timeout: 2000 });
    const query = ensureString(table?.getState?.()?.globalFilter);

    return (
        <div className="flex space-x-1 rtl:space-x-reverse">
      <span
          onClick={onClick}
          className={onClick ? "dark:text-gray-500 text-blue-500 cursor-pointer w-40 truncate text-xs-plus" : ""}
      >
        {highlight ? <Highlight query={query}>{val}</Highlight> : val}
      </span>

            <Button
                data-tooltip
                data-tooltip-content={copied ? "Copied" : "Copy"}
                onClick={(e) => {
                    e.stopPropagation(); // just in case
                    copy(val);
                }}
                isIcon
                variant="flat"
                className="size-5 rounded-full opacity-0 group-hover/td:opacity-100"
                aria-label="Copy Button"
            >
                <DocumentDuplicateIcon className="size-3.5" />
            </Button>
        </div>
    );
}

CopyableCell.propTypes = {
  getValue: PropTypes.func,
  table: PropTypes.object,
  highlight: PropTypes.bool,
};

CopyableCellWithClick.propTypes = {
    getValue: PropTypes.func,
    table: PropTypes.object,
    highlight: PropTypes.bool,
    onClick: PropTypes.func,
};
