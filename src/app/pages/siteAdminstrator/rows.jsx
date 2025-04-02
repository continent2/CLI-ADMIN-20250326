// Import Dependencies


import PropTypes from "prop-types";
import dayjs from "dayjs";

// Local Imports
import { useLocaleContext } from "app/contexts/locale/context";

// ----------------------------------------------------------------------

export function CreateUpdateCell({row}) {
    const {locale} = useLocaleContext();
    const createdDate = row.original["createdat"];
    const updatedDate = row.original["updatedat"];

    const formattedCreatedDate = createdDate
        ? `${dayjs(createdDate).locale(locale).format("DD MMM YYYY")} | ${dayjs(createdDate).locale(locale).format("hh:mm A")}`
        : "N/A";

    const formattedUpdatedDate = updatedDate
        ? `${dayjs(updatedDate).locale(locale).format("DD MMM YYYY")} | ${dayjs(updatedDate).locale(locale).format("hh:mm A")}`
        : "N/A";

    return (
        <div>
            <p>{formattedCreatedDate}</p>
            <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
            <p>{formattedUpdatedDate}</p>
        </div>
    );
}

export function userDetail({row}) {
    const Id = row.original["id"];
    const userName = row.original["username"];

    return (
        <div>
            <p>{Id ?? "N/A"}</p>
            <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
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