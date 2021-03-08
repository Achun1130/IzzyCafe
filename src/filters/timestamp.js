export default function (timestamp) {
  const date = new Date(timestamp * 1000);
  const option = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return date.toLocaleDateString('zh-TW', option);
}
