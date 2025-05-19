export function formatNumberWithCommas(number) {
  return (+number || 0).toLocaleString();
}

export function unformatNumberWithCommas(formattedNumber) {
  return String(formattedNumber)?.replace(/,/g, '');
}
