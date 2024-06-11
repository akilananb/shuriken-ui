export const filtersToQueryString = (filters) => {
  return Object.keys(filters)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(filters[key])
    )
    .join("&");
};

export const formatDate = (inputDate) => {
  let date;

  if (inputDate.includes("/")) {
    const [datePart, timePart] = inputDate.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    const [time, period] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    date = new Date(2000 + year, month - 1, day, hours, minutes);
  } else {
    date = new Date(inputDate);
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const abbreviatedMonth = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(2);

  const formattedDate = `${abbreviatedMonth}-${day}-${year}`;

  return formattedDate;
};
