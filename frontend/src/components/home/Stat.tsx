import React from "react";

import { StatsInterface } from "../../utils/models";
import "./Stats.css";

const Stat: React.FC<StatsInterface> = ({ icon, color, title, value }) => {
  return (
    <div className="stat">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
};

export default Stat;
