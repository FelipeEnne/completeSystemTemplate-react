import React from "react";

import { StatsComponetInterface } from "../../utils/models";
import "./Stats.css";

const Stat: React.FC<StatsComponetInterface> = ({
  icon,
  color,
  title,
  value,
}) => {
  return (
    <div className="stat">
      <div className="stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
};

export default Stat;
