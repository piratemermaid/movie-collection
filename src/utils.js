export function formatTodaysDate() {
  const now = new Date();
  let day = now.getDate();
  if (day < 10) {
    day = "0" + String(day);
  }
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = "0" + String(month);
  }
  const year = now.getFullYear();

  return `${month}/${day}/${year}`;
}
