import React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import Form from "./formComponents/form";
import StartComponent from "./formComponents/StartComponent";
const Start = () => {
  return (
    <motion.div
      intial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <StartComponent />
      <Form />
    </motion.div>
  );
};

export default Start;
