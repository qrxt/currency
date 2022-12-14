export function formatDate(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function getNDaysAgo(days: number, date = new Date()) {
  const daysAgo = new Date(date.getTime());

  daysAgo.setDate(date.getDate() - days);

  return daysAgo;
}
