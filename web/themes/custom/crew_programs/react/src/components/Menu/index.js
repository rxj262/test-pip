import { motion } from "framer-motion";
import React, { useState } from "react";
import { Col, Row } from "react-flexbox-grid";

import styles from "./styles.css";

const SearchIcon = ({ color = "#000" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20.178"
    height="21.205"
    viewBox="0 0 20.178 21.205"
  >
    <g id="Search" transform="translate(0.709 1)">
      <path
        id="Path_1"
        data-name="Path 1"
        d="M10.362,2.5A7.862,7.862,0,1,1,2.5,10.362,7.862,7.862,0,0,1,10.362,2.5Z"
        transform="translate(0.245 -2.5)"
        fill="none"
        stroke={color}
        stroke-width="2"
      />
      <line
        id="Line_5"
        data-name="Line 5"
        y1="5.524"
        x2="5.493"
        transform="translate(0 13.976)"
        fill="none"
        stroke={color}
        stroke-width="2"
      />
      <path
        id="Path_1-2"
        data-name="Path 1"
        d="M10.362,2.5A7.862,7.862,0,1,1,2.5,10.362,7.862,7.862,0,0,1,10.362,2.5Z"
        transform="translate(0.245 -2.5)"
        fill="none"
        stroke={color}
        stroke-width="2"
      />
      <line
        id="Line_5-2"
        data-name="Line 5"
        y1="5.524"
        x2="5.493"
        transform="translate(0 13.976)"
        fill="none"
        stroke={color}
        stroke-width="2"
      />
    </g>
  </svg>
);

const Menu = () => {
  const images = {
    home: "https://case.edu/images/programs/cwrusign.jpg",
    about: "https://case.edu/images/programs/about.jpg",
    academics: "https://case.edu/images/programs/academics.jpg",
    admissions: "https://case.edu/images/programs/admission.jpg",
    campusLife: "https://case.edu/images/programs/campus-life.jpg",
    research: "https://case.edu/images/programs/research.jpg",
    giving: "https://case.edu/images/programs/giving.jpg",
  };

  const menuItems = [
    {
      name: "About",
      to: "https://case.edu/about",
      src: images.about,
      alt: "hero",
    },
    {
      name: "Academics",
      to: "https://case.edu/academics",
      src: images.academics,
      alt: "hero",
    },
    {
      name: "Admissions",
      to: "https://case.edu/admissions",
      src: images.admissions,
      alt: "hero",
    },
    {
      name: "Campus Life",
      to: "https://case.edu/campus-life",
      src: images.campusLife,
      alt: "hero",
    },
    {
      name: "Research",
      to: "https://case.edu/cwruresearch",
      src: images.research,
      alt: "hero",
    },
    {
      name: "Giving",
      to: "https://case.edu/giving",
      src: images.giving,
      alt: "hero",
    },
  ];

  const resourceItems = [
    { name: "Students", to: "https://case.edu/students" },
    { name: "Faculty", to: "https://case.edu/faculty" },
    { name: "Staff", to: "https://case.edu/staff" },
    { name: "Alumni", to: "https://case.edu/alumni-resources" },
    { name: "Parents and Families", to: "https://case.edu/parents-families" },
  ];

  const quickItems = [
    { name: "Directory", to: "https://webapps.case.edu/directory/" },
    { name: "Webmail", to: "https://mail.google.com/a/case.edu/" },
    { name: "Canvas", to: "https://canvas.case.edu/" },
    { name: "Maps", to: "https://webapps.case.edu/map/" },
    { name: "UTech", to: "https://case.edu/utech/" },
  ];

  const [imgSrc, setImgSrc] = useState(images.home);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className={styles.container}
    >
      <motion.div
        className={styles.panel}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <motion.div
        className={`${styles.panel} ${styles.right}`}
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75 }}
        className={styles.leftHalf}
      >
        <div className={styles.imageHolder}>
          <img src={imgSrc} alt="hero" />
        </div>
      </motion.div>
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.75 }}
        className={styles.menuRight}
      >
        <form
          action="//www.case.edu/search-results/"
          role="search"
          aria-label="search"
        >
          <label htmlFor="q">
            Search:
            <input
              type="search"
              placeholder="What are you looking for?"
              id="site-search"
              name="q"
            />
            <input
              type="hidden"
              name="cx"
              value="004305171799132815236:ciq4c8b3yv4"
            />
            <input type="hidden" name="ie" value="UTF-8" />
            <input
              style={{ display: "none" }}
              name="sa"
              type="submit"
              title="search"
              alt="search"
              value="search"
            ></input>
            <button type="submit" className={styles.icon}>
              <SearchIcon color="#fff" />
            </button>
          </label>
        </form>
        <div className={styles.menuHeight}>
          <div>
            <Row middle="xs" between="md">
              <Col xs={12} md={6}>
                <motion.ul
                  className={styles.menuMain}
                  variants={staggerUp}
                  id="main-menu"
                >
                  {menuItems.map((menuItem) => (
                    <motion.li
                      key={menuItem.name}
                      variants={staggerUpChild}
                      whileHover={{ x: 10 }}
                      onMouseOver={() => setImgSrc(menuItem.src)}
                    >
                      <span></span>
                      <a href={menuItem.to}>{menuItem.name}</a>
                    </motion.li>
                  ))}
                </motion.ul>
              </Col>
              <Col xs={12} md={5}>
                <div className={styles.forLinks}>
                  <label htmlFor="for-link-ul">Information For:</label>
                  <motion.ul variants={staggerUp} id="for-link-ul">
                    {resourceItems.map((resourceItem) => (
                      <motion.li
                        key={resourceItem.name}
                        variants={staggerUpChild}
                      >
                        <a href={resourceItem.to}>{resourceItem.name}</a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.otherLinks}>
            <motion.ul variants={staggerUp} id="other-link-ul">
              <label htmlFor="other-link-ul">Quick Links:</label>
              {quickItems.map((quickItem) => (
                <motion.li key={quickItem.name} variants={staggerUpChild}>
                  <a href={quickItem.to}>{quickItem.name}</a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
export const staggerUp = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.04,
    },
  },
};

export const staggerUpChild = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export default Menu;
