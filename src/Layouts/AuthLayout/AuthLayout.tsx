import React, { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout(): React.ReactElement {
  const images = ["/image/UI/kanan.jpg", "/image/UI/kanan_2.jpg"];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-svh relative">
      <div className="absolute inset-0 grid lg:grid-cols-[611px_1fr]">
        <div className="relative bg-[#1F1F27] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at bottom left, rgba(0,224,198,0.35), transparent 70%)",
            }}
          />
        </div>
        
        <div className="relative bg-black overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={`absolute right-0 top-0 h-full w-full object-contain select-none transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
                  }`}
                draggable={false}
              />
            ))}
          </div>

          <div className="absolute top-10 left-10 text-white z-10 font-helvetica">
            <h1 className="text-xl font-semibold">"Stay Connected, Serve Better."</h1>
            <p className="underline cursor-pointer">Learn More</p>
          </div>


          <div className="absolute bottom-6 right-6 flex flex-col items-center gap-3 text-white z-20">
            <div className="relative h-[3px] w-32 bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-white rounded-full transition-transform duration-500 ease-out"
                style={{
                  width: `${100 / images.length}%`,
                  transform: `translateX(${index * 100}%)`,
                }}
              />
            </div>

            <div className="flex items-center gap-8">
              <button
                onClick={prev}
                className="p-2 hover:scale-125 transition-transform"
              >
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="rotate-180"
                >
                  <path
                    d="M10.8691 11.6633L2.11906 21.0383C2.03776 21.1254 1.94125 21.1945 1.83503 21.2417C1.72881 21.2888 1.61497 21.3131 1.5 21.3131C1.38503 21.3131 1.27118 21.2888 1.16496 21.2417C1.05874 21.1945 0.962232 21.1254 0.880935 21.0383C0.799639 20.9512 0.735151 20.8478 0.691154 20.734C0.647156 20.6202 0.624512 20.4982 0.624512 20.375C0.624512 20.2519 0.647156 20.1299 0.691154 20.0161C0.735151 19.9023 0.799639 19.7989 0.880935 19.7118L9.01297 11L0.880935 2.28831C0.71675 2.1124 0.624512 1.87381 0.624512 1.62503C0.624512 1.37625 0.71675 1.13766 0.880935 0.961752C1.04512 0.785839 1.2678 0.687012 1.5 0.687012C1.73219 0.687012 1.95488 0.785839 2.11906 0.961752L10.8691 10.3368C10.9504 10.4238 11.015 10.5272 11.059 10.641C11.103 10.7548 11.1257 10.8768 11.1257 11C11.1257 11.1232 11.103 11.2452 11.059 11.359C11.015 11.4729 10.9504 11.5762 10.8691 11.6633Z"
                    fill="white"
                  />
                </svg>
              </button>

              <button
                onClick={next}
                className="p-2 hover:scale-125 transition-transform"
              >
                <svg
                  width="12"
                  height="20"
                  viewBox="0 0 12 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8691 11.6633L2.11906 21.0383C2.03776 21.1254 1.94125 21.1945 1.83503 21.2417C1.72881 21.2888 1.61497 21.3131 1.5 21.3131C1.38503 21.3131 1.27118 21.2888 1.16496 21.2417C1.05874 21.1945 0.962232 21.1254 0.880935 21.0383C0.799639 20.9512 0.735151 20.8478 0.691154 20.734C0.647156 20.6202 0.624512 20.4982 0.624512 20.375C0.624512 20.2519 0.647156 20.1299 0.691154 20.0161C0.735151 19.9023 0.799639 19.7989 0.880935 19.7118L9.01297 11L0.880935 2.28831C0.71675 2.1124 0.624512 1.87381 0.624512 1.62503C0.624512 1.37625 0.71675 1.13766 0.880935 0.961752C1.04512 0.785839 1.2678 0.687012 1.5 0.687012C1.73219 0.687012 1.95488 0.785839 2.11906 0.961752L10.8691 10.3368C10.9504 10.4238 11.015 10.5272 11.059 10.641C11.103 10.7548 11.1257 10.8768 11.1257 11C11.1257 11.1232 11.103 11.2452 11.059 11.359C11.015 11.4729 10.9504 11.5762 10.8691 11.6633Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="relative z-10 min-h-svh flex items-center">
        <main className="w-full lg:w-[611px] p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
//

