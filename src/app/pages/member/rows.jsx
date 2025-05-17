// Import Dependencies

import PropTypes from "prop-types";
import dayjs from "dayjs";

// Local Imports
import { useLocaleContext } from "app/contexts/locale/context";
import { formatNumberWithCommas } from "utils/formatNumberWithCommas";
import { isKoreanFormat } from "utils/formatNumber";

// ----------------------------------------------------------------------

export function CreateUpdateCell({ row }) {
  const { locale } = useLocaleContext();
  const createdDate = row.original.info["createdat"];
  const updatedDate = row.original.info["updatedat"];

  const dateFormat = isKoreanFormat ? 'YYYY년MM월DD일' : 'YYYY-MM-DD';

  const formattedCreatedDate = createdDate
    ? `${dayjs(createdDate).locale(locale).format(dateFormat)} | ${dayjs(createdDate).locale(locale).format("HH:mm:ss")}`
    : "N/A";

  const formattedUpdatedDate = updatedDate
    ? `${dayjs(updatedDate).locale(locale).format(dateFormat)} | ${dayjs(updatedDate).locale(locale).format("HH:mm:ss")}`
    : "N/A";

  return (
    <div>
      {/* <p>{formattedCreatedDate}</p>
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
      <p>{formattedUpdatedDate}</p>
    </div>
  );
}

export function SiteIdURL({ row }) {
  const siteURL = row.original.info?.["site.siteurl"];
  console.log(row, "siteurl")
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
        {siteURL != null ? siteURL.replace(/^https?:\/\//, "") : "N/A"}
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
    <div style={{ color: "rgb(214, 158, 54)" }}  >
      <div className="flex items-center justify-between gap-x-1">
        <span>
          <img className="h-[25px] object-contain rounded-full" src="/images/Ticon.png" />
        </span>
        <span className="flex items-center" >
          <p>{formatNumberWithCommas(sum?.toFixed(0)) ?? 0}</p>
          <p>({formatNumberWithCommas(count?.toFixed(0)) ?? 0})</p>
        </span>
      </div>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <div className="flex items-center justify-between" >
        <span className="text-black pl-1 dark:text-white" >
          ₩
        </span>
        <span>
          {formatNumberWithCommas(sumInQuote?.toFixed(0))}
        </span>
      </div>
    </div>
  );
}

export function Stat2({ row }) {
  const sum = row.original.stat?.["sum_2d"];
  const count = row.original.stat?.["count_2d"];
  const sumInQuote = row.original.stat?.["sum_2d_in_quote"];

  return (
    <div style={{ color: "rgb(214, 158, 54)" }}  >
      <div className="flex items-center justify-between gap-x-1">
        <span>
          <img className="h-[25px] object-contain rounded-full" src="/images/Ticon.png" />
        </span>
        <span className="flex items-center" >
          <p>{formatNumberWithCommas(sum?.toFixed(0)) ?? 0}</p>
          <p>({formatNumberWithCommas(count?.toFixed(0)) ?? 0})</p>
        </span>
      </div>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <div className="flex items-center justify-between" >
        <span className="text-black pl-1 dark:text-white" >
          ₩
        </span>
        <span>
          {formatNumberWithCommas(sumInQuote?.toFixed(0))}
        </span>
      </div>
    </div>
  );
}

export function bankNameNative({ row }) {
  const bankname = row.original.info["banknamenative"];


  return (
    <div>
      {/* <p>{formattedCreatedDate}</p>
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
      <p>{bankname != null || undefined ? bankname : "N/A"}</p>
    </div>
  );
}

export function bankAccount({ row }) {
  const bankacc = row.original.info["bankaccount"];


  return (
    <div>
      {/* <p>{formattedCreatedDate}</p>
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
      <p>{bankacc != null || undefined ? bankacc : "N/A"}</p>
    </div>
  );
}



export function refundAddress({ row }) {
  const refundaddress = row.original.info["refundaddress"];


  return (
    <div>
      {/* <p>{formattedCreatedDate}</p>
        <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
      <p>{refundaddress != null || undefined ? refundaddress : "N/A"}</p>
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

bankNameNative.propTypes = {
  row: PropTypes.object,
};

bankAccount.propTypes = {
  row: PropTypes.object,
};

refundAddress.propTypes = {
  row: PropTypes.object,
};
