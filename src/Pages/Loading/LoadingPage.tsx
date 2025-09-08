import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LoadingPage(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        background: "linear-gradient(to bottom, #020000 41%, #12101C 100%)",
      }}
    >
      <div className="flex flex-col items-center gap-3 text-white">
        <motion.img
          src="/image/Guirez_Holo.svg"
          alt="guirez"
          className="w-[520px] max-w-[86vw] select-none cursor-pointer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            mass: 1,
            stiffness: 117.6,
            damping: 34.29,
            delay: 0.001,
          }}
          draggable={false}
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
}
