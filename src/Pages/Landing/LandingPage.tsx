import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const navigatingRef = useRef(false);

  return (
    <div className="min-h-screen bg-[#12101C] grid place-items-center">
      <motion.img
        src="/image/Guirez_2.svg"
        alt="Guirez Logo"
        className="w-28 h-28 md:w-36 md:h-36 cursor-pointer"
        layoutId="app-logo"
        whileHover={{ scale: 1.1 }}
        transition={{
          type: "spring",
          mass: 1,
          stiffness: 117.6,
          damping: 34.29,
          delay: 0.001,
        }}
        onHoverStart={() => {
          if (navigatingRef.current) return;
          navigatingRef.current = true;
          setTimeout(() => navigate("/loading"), 1);
        }}
      />
    </div>
  );
}
