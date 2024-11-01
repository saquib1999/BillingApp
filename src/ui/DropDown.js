import React, { useEffect, useState } from "react";

const DropDown = (props) => {
  const dropDownName = props.dropDownName;
  const [show, setShow] = useState(false);

  const toggleDropDown = () => {
    setShow((preValue) => !preValue);
  };

  const [input, setInput] = useState("");

  const onInputChange = (e) => {
    setShow(true);
    setInput(e.target.value);
    props.onInputChange(e.target.value);
  };

  const onSelect = (opt) => {
    setInput(opt[dropDownName]);
    setShow(false);
    props.onInputChange(opt[dropDownName]);
    props.onSelect(opt);
  };

  useEffect(() => {
    setInput("");
  }, [props.clr]);
  return (
    <div className="searchBox">
      <div onClick={toggleDropDown}>
        <input
          style={{ zIndex: "-1" }}
          placeholder={props.placeholder}
          value={input}
          onChange={onInputChange}
        />
      </div>

      {show && (
        <div
          className="optionBox"
          style={{
            position: "absolute",
            backgroundColor: "white",
            zIndex: "2",
            border: " 1px solid black",
          }}
        >
          {props.options &&
            props.options.map((c, i) => {
              return (
                <div
                  tabIndex={2}
                  key={c.key}
                  onClick={() => onSelect(c)}
                  className="options"
                  value={c.key}
                >
                  {c[dropDownName]}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default DropDown;
