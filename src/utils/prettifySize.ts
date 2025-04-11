export const prettifySize = (size: number): string => {
  const factor = 1000;
  let pow = 0;

  while (size > factor) {
    pow++;
    size /= factor;
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const unit = units[pow];

  return `${size.toFixed(2)} ${unit}`;
};
