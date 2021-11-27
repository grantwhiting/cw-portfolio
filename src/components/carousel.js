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

const Carousel = ({ images, className }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageLinks = images.map((node) => node.guid);

  const imageIndex = wrap(0, imageLinks.length, page);

  const paginate = (event, newDirection) => {
    event.preventDefault();
    event.stopPropagation();
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className={className}>
      <div className="relative w-4/5 mx-auto" style={{ minHeight: "800px" }}>
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
              x: { type: "spring", stiffness: 500, damping: 30 },
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
            className="absolute object-contain w-full h-full"
          />
        </AnimatePresence>
      </div>
      <button
        className="absolute flex items-center justify-center -translate-y-1/2 top-1/2 w-14 h-14"
        onClick={(e) => paginate(e, -1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        className="absolute flex items-center justify-center -translate-y-1/2 top-1/2 right-4 w-14 h-14"
        onClick={(e) => paginate(e, 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default Carousel;
