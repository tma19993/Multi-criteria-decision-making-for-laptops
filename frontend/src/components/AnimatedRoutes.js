import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Result from "./Result";
import Start from "./Start";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Start />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
