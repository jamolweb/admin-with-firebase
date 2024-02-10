import React from 'react';
const StyledIcon = ({ children, color, fontSize }) => {
  return React.cloneElement(children, {
    color: color || 'green',
    fontSize: fontSize || '30px',
  });
};
export default StyledIcon;