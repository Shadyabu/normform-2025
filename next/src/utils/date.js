const getDateFromCMSDate = (date, isStart) => {

  let dateObject;

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (isStart !== true) {
    hours = 23;
    minutes = 59;
    seconds = 59;
  }

  let years = date.substring(0, 4);
  let months = date.substring(5, 7);
  let days = date.substring(8);

  years = parseFloat(years);
  months = parseFloat(months);
  days = parseFloat(days);

  dateObject = {days: days, months: months, years: years};

  dateObject = {
    timestamp: new Date(Date.UTC(years, months - 1, days, hours, minutes, seconds)),
    formattedDate: `${days.toString().padStart(2, '0')}/${months.toString().padStart(2, '0')}/${years.toString()}`
  };

  return dateObject;
}

export { getDateFromCMSDate };