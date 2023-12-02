import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Col, Grid, Row } from "react-flexbox-grid";
import styles from "./styles.css";
// components
import Menu from "../Menu";
import { Icon } from "./icon";
import logo from "./logo-notag.svg";

const Navbar = ({ clickHandler, active }) => {
  return (
    <header className={styles.header}>
      <Grid className={styles.zIndex} fluid>
        <Row between="xs" middle="xs" className={styles.row}>
          <Col xs={12} md={6}>
            <a href="/">
              <img src="https://dudbm6bcnmy8e.cloudfront.net/cwru/img/cwru_logo_primary_white.svg" alt="CWRU Logo" className={styles.logo} />
            </a>
          </Col>
          <Col xs={12} md={6}>
            <motion.div
              initial="initial"
              animate={active ? "animate" : "initial"}
              className={styles.alignRight}
            >
              <button onClick={clickHandler} className={styles.button}>
                MENU
                <Icon />
              </button>
            </motion.div>
          </Col>
        </Row>
      </Grid>
      <AnimatePresence>{active ? <Menu /> : null}</AnimatePresence>
    </header>
  );
};

export default Navbar;
