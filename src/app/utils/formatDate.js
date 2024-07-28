export function formatDate(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  let formattedDate = `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  return formattedDate;
}
