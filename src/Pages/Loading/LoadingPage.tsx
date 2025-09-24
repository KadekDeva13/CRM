import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoadingPage(): React.ReactElement {
  const navigate = useNavigate();
  const [playExit, setPlayExit] = useState(false);

  const handleClick = () => {
    setPlayExit(true);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: "linear-gradient(to bottom, #020000 41%, #12101C 100%)",
      }}
    >
      <AnimatePresence>
        {!playExit && (
          <motion.img
            key="logo"
            src="/image/Guirez_Holo.svg"
            alt="guirez"
            className="w-[520px] max-w-[86vw] select-none cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            draggable={false}
            onClick={handleClick}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
