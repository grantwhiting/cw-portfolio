import React from "react";
import FullScreenDiv, { states } from "./fullScreenDiv";
import { motion, AnimatePresence } from "framer-motion";

const ExpandableImage = ({ image, title }) => {
  console.log(image);
  return (
    <FullScreenDiv>
      {({ open, close, status }) => {
        const inactive = status === states.CLOSED || status === states.CLOSING;
        const active = status === states.OPEN || status === states.OPENING;
        return (
          <div
            onClick={() => (active ? close() : open())}
            className="relative block w-full mb-3 mr-3 cursor-pointer aspect-ratio-square bg-gray-50 break-inside-avoid"
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <AnimatePresence>
              {active && (
                <motion.img
                  src={image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 max-h-screen transform -translate-x-1/2 left-1/2"
                />
              )}
              {inactive && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-center bg-no-repeat bg-cover rounded-xl"
                    style={{ backgroundImage: `url(${image})` }}
                  ></motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  >
                    {title}
                  </motion.span>
                </>
              )}
            </AnimatePresence>
          </div>
        );
      }}
    </FullScreenDiv>
  );
};

export default ExpandableImage;
