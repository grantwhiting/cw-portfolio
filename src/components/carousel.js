import React from "react";
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
  const classNames = `${className} relative`;

  if (images?.length) {
    const imageLinks = images.map((node) => node.guid);
    const imageIndex = wrap(0, imageLinks.length, page);

    const paginate = (event, newDirection) => {
      event.preventDefault();
      event.stopPropagation();
      setPage([page + newDirection, newDirection]);
    };

    return (
      <div className={classNames}>
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
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
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
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    );
  }

  return null;
};

export default Carousel;
