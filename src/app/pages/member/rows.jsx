// Import Dependencies

import PropTypes from "prop-types";
import dayjs from "dayjs";

// Local Imports
import { useLocaleContext } from "app/contexts/locale/context";
import { formatNumberWithCommas } from "utils/formatNumberWithCommas";

// ----------------------------------------------------------------------

export function CreateUpdateCell({ row }) {
  const { locale } = useLocaleContext();
  const createdDate = row.original.info["createdat"];
  const updatedDate = row.original.info["updatedat"];

  const formattedCreatedDate = createdDate
    ? `${dayjs(createdDate).locale(locale).format("YYYY-MM-DD")} | ${dayjs(createdDate).locale(locale).format("HH:mm:ss")}`
    : "N/A";

  const formattedUpdatedDate = updatedDate
    ? `${dayjs(updatedDate).locale(locale).format("YYYY-MM-DD")} | ${dayjs(updatedDate).locale(locale).format("HH:mm:ss")}`
    : "N/A";

  return (
    <div>
      <p>{formattedCreatedDate}</p>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <p>{formattedUpdatedDate}</p>
    </div>
  );
}

export function SiteIdURL({ row }) {
  const siteURL = row.original.info?.["site.siteurl"];
  const siteId = row.original.info?.["site.id"];

  return (
    <div>
      <a
        key={siteURL}
        href={siteURL || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 no-underline dark:text-gray-500"
      >
        {siteURL.replace(/^https?:\/\//, "") || "N/A"}
      </a>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <p>{siteId || "N/A"}</p>
    </div>
  );
}

export function Stat1({ row }) {
  const sum = row.original.stat?.["sum_1d"];
  const count = row.original.stat?.["count_1d"];
  const sumInQuote = row.original.stat?.["sum_1d_in_quote"];

  return (
    <div>
      <div className="flex gap-x-1">
        <p>{formatNumberWithCommas(sum) ?? 0}</p>
        <p>({formatNumberWithCommas(count) ?? 0})</p>
      </div>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <p>{formatNumberWithCommas(sumInQuote.toFixed(2))}</p>
    </div>
  );
}

export function Stat2({ row }) {
  const sum = row.original.stat?.["sum_2d"];
  const count = row.original.stat?.["count_2d"];
  const sumInQuote = row.original.stat?.["sum_2d_in_quote"];

  return (
    <div>
      <div className="flex gap-x-1">
        <p>{formatNumberWithCommas(sum) ?? 0}</p>
        <p>({formatNumberWithCommas(count) ?? 0})</p>
      </div>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <p>{formatNumberWithCommas(sumInQuote.toFixed(2))}</p>
    </div>
  );
}

CreateUpdateCell.propTypes = {
  row: PropTypes.object,
};

SiteIdURL.propTypes = {
  row: PropTypes.object,
};

Stat1.propTypes = {
  row: PropTypes.object,
};

Stat2.propTypes = {
  row: PropTypes.object,
};
