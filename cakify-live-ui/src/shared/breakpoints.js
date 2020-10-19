const breakpoints = {
    xlarge: [1281, 1680],
    large: [981, 1280],
    medium: [737, 980],
    small: [481, 736],
    xsmall: [361, 480],
    xxsmall: [null, 360],
    'xlarge-to-max': '(min-width: 1681px)',
    'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
  };
  
  export const islessThan = (value, bp) => {
    if (!breakpoints[bp]) {
      return;
    }
    return value < breakpoints[bp][0];
  };
  export const isMoreThan = (value, bp) => {
    if (!breakpoints[bp]) {
      return;
    }
    return value > breakpoints[bp][1];
  };
  
  export const isBetween = (value, bp) => {
    if (!breakpoints[bp]) {
      return;
    }
    return value >= breakpoints[bp][0] && value <= breakpoints[bp][1];
  };
  
  export default {
    XL: "xlarge",
    L: "large",
    M: "medium",
    S: "small",
    XS: "xsmall",
    XXS: "xxsmall",
  };