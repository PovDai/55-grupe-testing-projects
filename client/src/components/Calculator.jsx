import React, { useState } from "react";


export function Calculator() {
  const [input, setInput] = useState("");
  const [showFireworks, setShowFireworks] = useState(false);

  const handleClick = (value) => setInput((prev) => prev + value);
  const handleClear = () => {
    setInput("");
    setShowFireworks(false);
  };
  const handleEquals = () => {
    try {
      setInput(eval(input).toString());
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 1500);
    } catch {
      setInput("Error");
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="calculator-wrapper">
      <h2 className="calculator-title">🧮 Calculator</h2>

      <div className="calculator-card">
        <input
          type="text"
          className="calculator-input"
          value={input}
          readOnly
        />

        <div className="calculator-buttons row g-2">
          {buttons.flat().map((btn, idx) => (
            <div key={idx} className="col-3">
              <button
                className={`calculator-btn ${btn === "=" ? "equals-btn" : ""}`}
                onClick={() =>
                  btn === "="
                    ? handleEquals()
                    : btn === "C"
                    ? handleClear()
                    : handleClick(btn)
                }
              >
                {btn}
              </button>
            </div>
          ))}

          {/* Clear mygtukas */}
          <div className="col-12 mt-2">
            <button className="clear-btn w-100" onClick={handleClear}>
              C
            </button>
          </div>
        </div>

        {showFireworks && <div className="fireworks"></div>}
      </div>
    </div>
  );
}