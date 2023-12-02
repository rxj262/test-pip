import { motion } from "framer-motion";
import * as React from "react";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 0%)"
    strokeLinecap="round"
    {...props}
  />
);

export const Icon = () => (
  <svg width="23" height="16" viewBox="0 0 23 20">
    <Path
      variants={{
        initial: { d: "M 2 2.5 L 18 2.5" },
        animate: { d: "M 3 16.5 L 17 2.5" },
      }}
    />
    <Path
      d="M 2 9.423 L 23 9.423"
      variants={{
        initial: { opacity: 1 },
        animate: { opacity: 0 },
      }}
      transition={{ duration: 0.1 }}
    />
    <Path
      variants={{
        initial: { d: "M 2 16.346 L 15 16.346" },
        animate: { d: "M 3 2.5 L 17 16.346" },
      }}
    />
  </svg>
);
