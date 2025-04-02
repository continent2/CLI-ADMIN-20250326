// Import Dependencies
import PropTypes from "prop-types";

// Local Imports
import {
    Pagination,
    PaginationItems,
    PaginationNext,
    PaginationPrevious,
    Select,
} from "components/ui";
import {useBreakpointsContext} from "app/contexts/breakpoint/context";
import { useNavigate } from "react-router";

// ----------------------------------------------------------------------

export function PaginationSection({table,paginationData}) {
    const paginationState = table.getState().pagination;
    const {isXl, is2xl} = useBreakpointsContext();
    const navigate = useNavigate();


    const {
        fetchData,
        count,
        pageIndex,
        name
    } = paginationData

    return (
        <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="flex items-center space-x-2 text-xs+ rtl:space-x-reverse">
                <span>Show</span>
                <Select
                    data={[10, 20, 30, 40, 50, 100]}
                    value={paginationState.pageSize}
                    onChange={(e) => {
                        fetchData({offSet: 0, limit: e.target.value});
                        table.setPageSize(Number(e.target.value)
                        );
                    }}
                    classNames={{
                        root: "w-fit",
                        select: "h-7 rounded-full py-1 text-xs ltr:!pr-7 rtl:!pl-7",
                    }}
                />
                <span>entries</span>
            </div>
            <div>
                <Pagination
                    total={Math.ceil(count / paginationState.pageSize)}
                    value={+pageIndex}
                    onChange={(page) => {
                        fetchData({offSet: (page - 1) * paginationState.pageSize, limit: paginationState.pageSize});
                        table.setPageIndex(page);
                        navigate(`/${name}?page=${page}`);
                    }}
                    siblings={isXl ? 2 : is2xl ? 3 : 1}
                    boundaries={isXl ? 2 : 1}
                >
                    <PaginationPrevious/>
                    <PaginationItems/>
                    <PaginationNext/>
                </Pagination>
            </div>
            <div className="truncate text-xs">
                {(pageIndex - 1) * paginationState.pageSize + 1} -{" "}
                {(pageIndex - 1) * paginationState.pageSize + paginationState.pageSize} of{" "}
                {count} entries
            </div>
        </div>
    );
}

PaginationSection.propTypes = {
    table: PropTypes.object,
};
