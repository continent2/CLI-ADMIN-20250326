// Import Dependencies


import PropTypes from "prop-types";
import dayjs from "dayjs";

// Local Imports
import { useLocaleContext } from "app/contexts/locale/context";
import { isKoreanFormat } from "utils/formatNumber";

// ----------------------------------------------------------------------

export function CreateUpdateCell({ row }) {
    const { locale } = useLocaleContext();
    const createdDate = row.original["createdat"];
    const updatedDate = row.original["updatedat"];

    // const isKoreanFormat = locale === 'en' ;

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
            {/* <p>{formattedCreatedDate}</p>
            <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} /> */}
            <p>{formattedUpdatedDate}</p>
        </div>
    );
}

export function userDetail({ row }) {
    const Id = row.original["id"];
    const userName = row.original["username"];

    return (
        <div>
            <p>{Id ?? "N/A"}</p>
            <div style={{ margin: "8px 0", borderBottom: "2px solid #ddd" }} />
            <p>{userName ?? "N/A"}</p>
        </div>
    );
}



CreateUpdateCell.propTypes = {
    getValue: PropTypes.func,
};

userDetail.propTypes = {
    getValue: PropTypes.func,
};