const citydata = [
    { label: 'Lahore' },
    { label: 'Islamabad' },
  ];
  
  export function addCity(cityLabel) {
    const existingCity = citydata.find(city => city.label === cityLabel);
    if (!existingCity) {
      citydata.push({ label: cityLabel });
      return true;
    }
    return false; 
  }
  
  
  export function removeCity(index) {
    if (index >= 0 && index < citydata.length) {
      citydata.splice(index, 1);
    }
  }
  
  
  export default citydata;
  