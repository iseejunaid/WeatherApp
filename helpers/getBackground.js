export const getBackgroundColor = (weatherstate) => {
    if (weatherstate === 'Clear') {
      return '#48AEFF';
    } else if (weatherstate === 'Rain') {
      return '#3F7CD7';
    } else if (weatherstate === 'Clouds') {
      return '#37B8FC';
    } else if (weatherstate === 'Snow') {
      return '#37B8FC';
    } else if (weatherstate === 'Drizzle') {
      return '#3F7CD7';
    } else if (weatherstate === 'Thunderstorm') {
      return '#6840A3';
    } else {
      return 'lightgrey';
    }
  };