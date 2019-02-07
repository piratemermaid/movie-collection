export const OMDB_API = "http://www.omdbapi.com/?apikey=b502230&";

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

export function titleFromTags(arr) {
  let title = "";
  let titleArr = arr.split("&");
  if (titleArr.length === 1) {
    title = titleArr[0];
  } else if (titleArr.length === 2) {
    title = titleArr[0] + " & " + titleArr[1];
  } else {
    for (let i in titleArr) {
      if (i < titleArr.length - 1) {
        title += titleArr[i] + ", ";
      } else {
        title += " & " + titleArr[i];
      }
    }
  }
  return title;
}
