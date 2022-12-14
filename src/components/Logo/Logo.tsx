import { useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";

const draw = {
  visible: (i: number) => {
    const delay = i * 0.2;
    return {
      rotateY: 180,
      transition: {
        rotateY: { delay, duration: 0.5 },
      },
    };
  },
};

function Logo() {
  const logoFill = useColorModeValue("black", "#EFF0F1");

  return (
    <motion.svg
      aria-hidden
      width={65}
      height={65}
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid meet"
      animate="visible"
    >
      <g
        transform="translate(0,200) scale(0.1,-0.1)"
        fill={logoFill}
        stroke="none"
      >
        <motion.path
          d="M587 1698 l-397 -231 0 -467 0 -467 397 -229 c219 -126 404 -229 413
 -229 8 0 194 103 413 229 l397 229 0 467 0 467 -397 229 c-218 126 -404 230
 -412 231 -9 1 -195 -102 -414 -229z m745 -146 l308 -177 0 -375 0 -375 -313
 -180 c-171 -98 -319 -179 -327 -179 -8 0 -156 81 -327 179 l-313 180 0 375 0
 375 318 183 c187 107 323 180 332 177 8 -4 153 -86 322 -183z"
          variants={draw}
          custom={1}
        />
        <motion.path
          d="M698 1512 l-288 -167 0 -345 0 -345 287 -165 c158 -91 294 -165 303
 -165 8 0 145 74 302 165 l288 165 0 345 0 345 -287 165 c-158 91 -294 166
 -302 167 -9 1 -145 -73 -303 -165z m522 -144 l210 -121 0 -247 0 -247 -211
 -122 c-116 -66 -215 -121 -220 -121 -5 0 -103 55 -219 122 l-210 121 0 247 0
 247 208 121 c114 66 213 121 219 121 7 1 107 -54 223 -121z"
          variants={draw}
          custom={2}
        />
        <motion.path
          d="M803 1323 l-183 -106 0 -217 0 -217 185 -107 c101 -58 189 -106 195
 -106 6 0 94 48 195 106 l185 107 0 217 0 217 -185 107 c-101 58 -190 106 -197
 105 -7 0 -95 -48 -195 -106z m308 -135 l109 -62 0 -126 0 -126 -110 -63 -110
 -62 -110 62 -110 63 0 126 0 126 108 62 c59 34 109 62 111 62 2 0 52 -28 112
 -62z"
          variants={draw}
          custom={3}
        />
      </g>
    </motion.svg>
  );
}

export default Logo;
