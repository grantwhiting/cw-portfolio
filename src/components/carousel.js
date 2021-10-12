import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

// Example: https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?from-embed=&file=/src/Example.tsx:838-977

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Carousel = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageLinks = images.map((node) => node.guid);

  const imageIndex = wrap(0, imageLinks.length, page);

  const paginate = (event, newDirection) => {
    event.preventDefault();
    event.stopPropagation();
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={imageLinks[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(e, 1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(e, -1);
            }
          }}
          classNme="absolute"
        />
      </AnimatePresence>
      <button
        className="absolute -translate-y-1/2 top-1/2"
        onClick={(e) => paginate(e, 1)}
      >
        {"‣"}
      </button>
      <button
        className="absolute -translate-y-1/2 top-1/2 right-2"
        onClick={(e) => paginate(e, -1)}
      >
        {"‣"}
      </button>
    </div>
  );
};

export default Carousel;
