const priceFormatter = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 2,
});

export default function formatPrice(value) {
  return `${priceFormatter.format(Number(value))} грн`;
}
