import Typography from "typography";
import 'typeface-montserrat';

const typography = new Typography({ 
  baseFontSize: '18px',
  baseLineHeight: 1.666,
  headerFontFamily: [`Montserrat`, 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  bodyFontFamily: [`Montserrat`, 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  headerWeight: 'regular'
});

export default typography;