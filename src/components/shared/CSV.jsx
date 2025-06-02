import { useState } from 'react';
import PropTypes from 'prop-types';
import { exportToCSV, formatRowsForCSV } from '../../utils/csv';

export function ExportButton({ table, filename = 'deposit_data.csv', className = '' }) {
    const rows = table.getRowModel().rows;
    console.log(rows, "table data")
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        if (!rows || rows.length === 0) {
            alert('데이터가 없습니다');
            return;
        }

        setIsExporting(true);

        try {
            const formattedData = formatRowsForCSV(rows);
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const filenameWithTimestamp = filename.replace('.csv', `_${timestamp}.csv`);

            exportToCSV(formattedData, filenameWithTimestamp);
        } catch (error) {
            console.error('Export failed:', error);
            alert('내보내기에 실패했습니다');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting || !rows || rows.length === 0}
            className={`
        inline-flex items-center px-3 py-2 text-[11px] font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-dark-700 dark:text-dark-100 dark:border-dark-500 dark:hover:bg-dark-600
        ${className}
      `}
        >
            <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
            </svg>
            {isExporting ? 'CSV 내보내는 중...' : 'CSV 내보내기'}
        </button>
    );
}

ExportButton.propTypes = {
    rows: PropTypes.array.isRequired,
    filename: PropTypes.string,
    className: PropTypes.string,
};
