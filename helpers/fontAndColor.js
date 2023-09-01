export const getFontAndColor = (isDarkMode) => {
    const fontColor = isDarkMode ? 'white' : 'black';
    const iconColor = isDarkMode ? 'black' : 'white';
    const backColor = isDarkMode ? 'black' : 'white';
    
    return { fontColor, iconColor,backColor };
  };
