import PropTypes from "prop-types";
import {
  Pagination,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  Select,
} from "components/ui";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";


export function PaginationSection({ table, hasMore, totalItems }) {
  const paginationState = table.getState().pagination;
  const { isXl, is2xl } = useBreakpointsContext();

  const currentPage = paginationState.pageIndex + 1;
  const pageSize = paginationState.pageSize;
  const estimatedTotalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
      <div className="flex items-center space-x-2 text-xs+ rtl:space-x-reverse">
        <span>Show</span>
        <Select
          data={[10, 20, 30, 40, 50, 100]}
          value={pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
            table.setPageIndex(0); // Reset to the first page when page size changes
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
          total={estimatedTotalPages}
          value={currentPage}
          onChange={(page) => table.setPageIndex(page - 1)}
          siblings={isXl ? 2 : is2xl ? 3 : 1}
          boundaries={isXl ? 2 : 1}
        >
          <PaginationPrevious disabled={currentPage === 1} />
          <PaginationItems />
          <PaginationNext disabled={!hasMore} />
        </Pagination>
      </div>
      <div className="truncate text-xs">
        {(currentPage - 1) * pageSize + 1} -{" "}
        {Math.min(currentPage * pageSize, totalItems)} of{" "}
        {hasMore ? "many" : totalItems} entries
      </div>
    </div>
  );
}

PaginationSection.propTypes = {
  table: PropTypes.object.isRequired,
  hasMore: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
};
