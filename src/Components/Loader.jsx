import React from "react";

const Loader = () => {
  return (
    <>
      <div>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle r={32} cy={40} cx={40} id="test" />
          </svg>
        </div>
        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect height={64} width={64} y={8} x={8} />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Loader;
