import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { TiktokContext } from "../../tiktok-context";
const Tabs = ({ tabnames, children }) => {
  const { activeTab, setActiveTab } = useContext(TiktokContext);

  const [lineWidth, setLineWidth] = useState(0);
  const [lineOffset, setLineOffset] = useState(0);
  const openTab = (nameTab) => {
    setActiveTab(nameTab);
    moveBorderBottom(nameTab);
  };

  const moveBorderBottom = (nameTab) => {
    setLineWidth(document.getElementById(nameTab).offsetWidth);
    setLineOffset(document.getElementById(nameTab).offsetLeft);
  };
  const handleMouseLeave = () => {
    setLineWidth(document.querySelector(".tabname.active").offsetWidth);
    setLineOffset(document.querySelector(".tabname.active").offsetLeft);
  };

  useEffect(() => {
    openTab(tabnames[0]);
  }, []);

  return (
    <div>
      <div className="tabNames d-flex gap-3 border-bottom border-dark position-relative">
        {tabnames.map((tabname, i) => (
          <div
            key={i}
            id={tabname}
            role="button"
            className={
              activeTab == tabname
                ? "tabname fw-semibold px-4 pb-2 active"
                : "tabname fw-semibold px-4 pb-2"
            }
            onClick={() => openTab(tabname)}
            onMouseEnter={() => moveBorderBottom(tabname)}
            onMouseLeave={() => handleMouseLeave()}
          >
            {tabname}
          </div>
        ))}
        <div
          className="position-absolute bg-white"
          style={{ 
            
            bottom: 0,
            padding: "2px 0px",
            width: lineWidth,
            left: lineOffset,
            transition: "left 200ms linear",
            zIndex: 0,
          }}
        ></div>
      </div>
      <div className="tab-content">{children}</div>
    </div>
  );
};

export default Tabs;
