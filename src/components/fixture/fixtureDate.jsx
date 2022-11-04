import React, { memo } from "react";

const FixtureDate = memo(({ date }) => {
  const dateObj = new Date(date);
  const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${("0" + dateObj.getHours()).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}`;

  return (
    <span>{formattedDate}</span>
  );
});

export default FixtureDate;