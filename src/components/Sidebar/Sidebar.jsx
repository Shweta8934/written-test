import React from "react";
import "./Sidebar.css";

const Sidebar = ({ onHelpClick }) => {
  return (
    <aside className="sidebar">
      <button className="help-button" onClick={onHelpClick}>
        Help
      </button>
    </aside>
  );
};

export default Sidebar;
