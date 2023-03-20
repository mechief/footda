import React, { memo } from "react";

const PenaltyScore = memo(({ children, className, score, shortStatus }) => {
  if (!(shortStatus === 'P' || shortStatus === 'PEN') 
    || !score?.penalty?.home || !score?.penalty?.away) {
    return <></>;
  }

  return (
    <span className={className}>{children}</span>
  );
});

export default PenaltyScore;