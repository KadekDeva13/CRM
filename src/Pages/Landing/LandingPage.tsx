import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#12101C] flex items-center justify-center">
      <motion.img
        src="/image/Guirez_2.svg"
        alt="Guirez Logo"
        className="w-28 h-28 md:w-36 md:h-36 cursor-pointer"
        whileHover={{
          scale: 1.1,
        }}
        transition={{
          type: "spring",
          mass: 1,
          stiffness: 117.6,
          damping: 34.29,
          delay: 0.001,
        }}
        onMouseEnter={() => {
          setTimeout(() => {
            navigate("/loading");
          }, 1); 
        }}
      />
    </div>
  );
}
