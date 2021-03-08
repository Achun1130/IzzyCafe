export default function (dollar) {
  const n = Number(dollar);
  return (n).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
}
