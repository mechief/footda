import React, { memo } from "react";
import { useSelector } from "react-redux";

const TeamName = memo(({ team }) => {
  const nameKr = useSelector((state) => state.language['ko-kr'].teams[team.id]);
  
  return (
    <>{nameKr || team.name}</>
  );
});

export default TeamName;