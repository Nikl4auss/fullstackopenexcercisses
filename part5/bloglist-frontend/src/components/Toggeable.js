import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggeable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} id="openButton">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="toggeableContent">
        {props.children}
        <button onClick={toggleVisibility} id="cancelButton">
          cancel
        </button>
      </div>
    </div>
  );
});

Toggeable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggeable.displayName = "Toggeable";
export default Toggeable;
