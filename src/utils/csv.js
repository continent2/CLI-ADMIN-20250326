export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Get headers from the first row
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Headers row
    headers.join(','),
    // Data rows
    ...data.map(row => 
      headers.map(header => {
        let value = row[header];
        // Handle nested objects and arrays
        if (typeof value === 'object' && value !== null) {
          value = JSON.stringify(value).replace(/"/g, '""');
        }
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          value = `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const formatRowsForCSV = (rows) => {
  return rows.map(row => {
    const original = row.original;
    return {
      '생성시간': original['transfer.timestamp'] ? new Date(original['transfer.timestamp']).toLocaleString() : 'N/A',
      '아이디': original['id'] || 'N/A',
      '사용자이름': original['user.username'] || 'N/A',
      '외부사용자ID': original['user.externaluserid'] || 'N/A',
      '사이트URL': original['site.siteurl'] || 'N/A',
      '사이트ID': original['site.id'] || 'N/A',
      '거래금액': original['transfer.amount'] || 'N/A',
      '거래화폐': original['transfer.currency'] || 'N/A',
      '환산금액': original['transfer.convamount'] || 'N/A',
      '전송ID': original['transfer.txhash'] || 'N/A',
      '보낸주소': original['transfer.from'] || 'N/A',
      '받은주소': original['transfer.to'] || 'N/A',
      '상태': original['dispstrstatus'] || original['status'] || 'N/A'
    };
  });
};
