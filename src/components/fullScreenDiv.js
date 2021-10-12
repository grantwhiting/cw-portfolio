import React, { useState } from "react";
import { Portal } from "react-portal";
import { motion } from "framer-motion";
import useDimensions from "react-use-dimensions";

const spring = {
  type: "spring",
  damping: 50,
  stiffness: 750,
  mass: 2,
};

const states = {
  CLOSED: "closed",
  OPENING: "opening",
  OPEN: "open",
  CLOSING: "closing",
};

const stackingPriority = {
  [states.CLOSED]: 1001,
  [states.CLOSING]: 1002,
  [states.OPENING]: 1003,
  [states.OPEN]: 10004,
};

const fullScreenPosition = {
  left: 0,
  width: "100vw",
  top: 0,
  height: "100vh",
};

const getPositionFromBoundingRect = (boundingRect) => {
  return {
    left: boundingRect.top,
    width: boundingRect.width,
    top: boundingRect.left,
    height: boundingRect.height,
  };
};

const FullScreenDiv = ({ children, style, ...rest }) => {
  const [status, setStatus] = useState(states.CLOSED);
  const [ref, dimensions] = useDimensions();

  const showExpanded = [states.OPENING, states.OPEN, states.CLOSING].includes(
    status
  );

  const originalPosition = getPositionFromBoundingRect(dimensions);

  const open = () => {
    setStatus(states.OPENING);
  };

  const close = () => {
    setStatus(states.CLOSING);
  };

  const handleRest = () => {
    if (status === states.OPENING) {
      setStatus(states.OPEN);
    } else if (status === states.CLOSING) {
      setStatus(states.CLOSED);
    }
  };

  // Maintain document flow
  const closedKids = children({ open, close, status: states.CLOSED });
  const kids = children({ open, close, status });

  return (
    <div
      ref={ref}
      style={{
        opacity: status === states.CLOSED ? 1 : 0,
        ...style,
      }}
      {...rest}
    >
      {closedKids}
      <Portal>
        {showExpanded && (
          <motion.div
            style={{
              position: "fixed",
              zIndex: stackingPriority[status],
            }}
            initial={
              [states.OPENING, states.OPEN].includes(status)
                ? originalPosition
                : fullScreenPosition
            }
            animate={
              [states.CLOSING, states.CLOSED].includes(status)
                ? originalPosition
                : fullScreenPosition
            }
            transition={spring}
            onAnimationComplete={handleRest}
          >
            {kids}
          </motion.div>
        )}
      </Portal>
    </div>
  );
};

export { states };

export default FullScreenDiv;
