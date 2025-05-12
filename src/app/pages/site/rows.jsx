// Import Dependencies
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Local Imports
import { useLocaleContext } from "app/contexts/locale/context";
import { CopyableCellWithClick } from "components/shared/table/CopyableCell";
import { tronScan_Address } from "../../../constants/app.constant.js";
import { formatNumberWithCommas } from "utils/formatNumberWithCommas.js";

// ----------------------------------------------------------------------

// export function CreateUpdateCell({ row }) {
//   const { locale } = useLocaleContext();
//   const createdDate = row.original.info["createdat"];
//   const updatedDate = row.original.info["updatedat"];

//   const formattedCreatedDate = createdDate
//     ? `${dayjs(createdDate).locale(locale).format("YYYY-MM-DD")} | ${dayjs(createdDate).locale(locale).format("HH:mm:ss")}`
//     : "N/A";

//   const formattedUpdatedDate = updatedDate
//     ? `${dayjs(updatedDate).locale(locale).format("YYYY-MM-DD")} | ${dayjs(updatedDate).locale(locale).format("HH:mm:ss")}`
//     : "N/A";

//   return (
//     <div>
//       <p>{formattedCreatedDate}</p>
//       <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
//       <p>{formattedUpdatedDate}</p>
//     </div>
//   );
// }

export function CreateUpdateCell({ row }) {
  const { locale } = useLocaleContext();
  const createdDate = row.original.info["createdat"];
  const updatedDate = row.original.info["updatedat"];

  const isKoreanFormat = locale === 'en';

  // const isKoreanFormat = true;
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
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <p>{formattedUpdatedDate}</p>
    </div>
  );
}


export function SiteIdURL({ row }) {
  const siteURL = row.original.info?.["siteurl"];
  const siteId = row.original.info?.["id"];

  return (
    <div>
      <a
        key={siteURL}
        href={siteURL || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 no-underline dark:text-gray-500"
      >
        {siteURL?.replace("https://", "") || "N/A"}
      </a>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <p>{siteId || "N/A"}</p>
    </div>
  );
}

export function AccountCell({ row, table }) {
  const Id = row.original.info?.["account.id"];
  const Address = row.original.info?.["account.address"];

  return (
    <div>
      <p>{Id ?? "N/A"}</p>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <CopyableCellWithClick
        getValue={() => Address ?? "N/A"}
        table={table}
        onClick={() => {
          if (Address) {
            window.open(`${tronScan_Address}${Address}`, "_blank");
          }
        }}
      />
    </div>
  );
}

export function Stat1({ row }) {
  const sum = row.original.stat?.["sum_cumul"];
  const count = row.original.stat?.["count_cumul"];

  return (
    <div>
      <p>{formatNumberWithCommas(sum?.toFixed(0)) ?? 0}</p>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <p>{formatNumberWithCommas(count?.toFixed(0))}</p>
    </div>
  );
}

export function Stat2({ row }) {
  const sum = row.original.stat?.["sum_2d"];
  const count = row.original.stat?.["count_2d"];

  return (
    <div>
      <p>{formatNumberWithCommas(sum?.toFixed(0)) ?? 0}</p>
      <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
      <p>{formatNumberWithCommas(count?.toFixed(0))}</p>
    </div>
  );
}

CreateUpdateCell.propTypes = {
  getValue: PropTypes.func,
};

SiteIdURL.propTypes = {
  row: PropTypes.object,
};

AccountCell.propTypes = {
  row: PropTypes.object,
};

Stat1.propTypes = {
  row: PropTypes.object,
};

Stat2.propTypes = {
  row: PropTypes.object,
};
