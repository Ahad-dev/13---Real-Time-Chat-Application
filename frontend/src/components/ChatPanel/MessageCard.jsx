import React from "react";
import { formatDateTimeMoment } from "../../utils/FormetDate";
import { motion } from "framer-motion";
const MessageCard = ({ time, message, come }) => {
  if (come) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y:0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      className=" max-w-96 py-3 text-white px-5 rounded-2xl bg-black/20">
        <p className="text-white/70  font-semibold">{formatDateTimeMoment(time)}</p>
        <p>{message}</p>
      </motion.div>
    );
  } else {
    return (
      <motion.div
      initial={{ y: 20, opacity: 0,scale:0.8 }}
      animate={{ y:0, opacity: 1 ,scale:1}}
      transition={{ duration: 0.4 }}
      className="ml-auto text-white w-[fit-content] max-w-96 text-start  py-3 px-5 rounded-2xl bg-blue-500/80">
        <p className=" text-white/70 font-semibold">{formatDateTimeMoment(time)}</p>
        <p>{message}</p>
      </motion.div>
    );
  }
};

export default MessageCard;
