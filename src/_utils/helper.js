export const filtersToQueryString = (filters) => {
    return Object.keys(filters)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(filters[key]))
      .join('&');
};

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
  
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
  }