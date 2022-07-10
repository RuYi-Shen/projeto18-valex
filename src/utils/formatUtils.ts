export function formatDate(date: Date) {
  let data = date,
    month = (data.getMonth() + 1).toString(),
    monthF = month.length == 1 ? "0" + month : month,
    yearF = data.getFullYear().toString().slice(-2);
  return monthF + "/" + yearF;
}

export function formatName(name: String) {
  const parts = name.trim().split(" ");
  const nameLength = parts.length;
  const firstName = parts.shift();
  let lastName = "";
  if (nameLength > 0) {
    lastName = parts.pop() || "";
  }
  const middleName = parts
    .map((part) => {
      if (part.length > 2) return part[0];
    })
    .join(" ");
  let formatedName = `${firstName} ${middleName} ${lastName}`;
  return formatedName
    .toUpperCase()
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function convertToDate(date: String) {
  const [month, year] = date.split("/").map(Number);
  return new Date(year + 2000, month - 1);
}
