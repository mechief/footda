import React, { memo } from "react";
import styled from "styled-components";

const FixtureDate = memo(({ date }) => {
  const dateObj = new Date(date);
  const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${("0" + dateObj.getHours()).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}`;

  return (
    <div>
      <span>{formattedDate}</span>
    </div>
  );
});

export default FixtureDate;