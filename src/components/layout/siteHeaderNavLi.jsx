import React from "react";
import { Link } from "react-router-dom";

const SiteHeaderNavLi = ({ link, name }) => {
  return (
    <li><Link to={link}>{name}</Link></li>
  );
}

export default SiteHeaderNavLi;