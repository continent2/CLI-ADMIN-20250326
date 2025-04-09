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
        ? `${dayjs(createdDate).locale(locale).format("YYYY-MM-DD")} | ${dayjs(createdDate).locale(locale).format("HH:mm:ss")}`
        : "N/A";

    const formattedUpdatedDate = updatedDate
        ? `${dayjs(updatedDate).locale(locale).format("YYYY-MM-DD")} | ${dayjs(updatedDate).locale(locale).format("HH:mm:ss")}`
        : "N/A";

    return (
        <div>
            <p>{formattedCreatedDate}</p>
            <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
            <p>{formattedUpdatedDate}</p>
        </div>
    );
}

export function AmountCurrency({row}) {
    const Amount = row.original["amount"];
    const Currency = row.original["currency"];

    return (
        <div>
            <p>{Amount?? "N/A"}</p>
            <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
            <p>{Currency ?? "N/A"}</p>
        </div>
    );
}

export function SendAccount({row}) {
    const ID = row.original["agency.id"];
    const Name = row.original["agency.name"];

    return (
        <div>
            <p>{ID?? "N/A"}</p>
            <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
            <p>{Name ?? "N/A"}</p>
        </div>
    );
}

export function ReceivedAccount({row}) {
    const ID = row.original["site.id"];
    const Name = row.original["site.siteurl"];

    return (
        <div>
            <p>{ID ?? "N/A"}</p>
            <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
            <a
                key={Name}
                href={Name || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-gray-500 text-blue-500 no-underline"
            >
                {Name.replace(/^https?:\/\//, '') || "N/A"}
            </a>

        </div>
    );
}

export function BankDetail({row}) {
    const Name = row.original["bankname"];
    const Account = row.original["bankaccount"];

    return (
        <div>
            <p>{Name ?? "N/A"}</p>
            <div style={{margin: "8px 0", borderBottom: "2px solid #ddd"}}/>
            <p>{Account ?? "N/A"}</p>
        </div>
    );
}

CreateUpdateCell.propTypes = {
    getValue: PropTypes.func,
};

AmountCurrency.propTypes = {
    getValue: PropTypes.func,
};

SendAccount.propTypes = {
    getValue: PropTypes.func,
};

ReceivedAccount.propTypes = {
    getValue: PropTypes.func,
};

BankDetail.propTypes = {
    getValue: PropTypes.func,
};







