import React, { memo } from "react";
import styled from "styled-components";

const FixtureDate = memo(({ date, onlyTime = false }) => {
  const dateObj = new Date(date);

  const formattedDate = onlyTime
    ? `${("0" + dateObj.getHours()).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}`
    : `${dateObj.getMonth() + 1}/${dateObj.getDate()} ${("0" + dateObj.getHours()).slice(-2)}:${("0" + dateObj.getMinutes()).slice(-2)}`;

  return (
    <span>{formattedDate}</span>
  );
});

export default FixtureDate;