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
                className={`absolute right-0 top-0 h-full w-auto object-contain select-none transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"
                  }`}
                draggable={false}
              />
            ))}
            <div className="absolute inset-0 bg-black/40" />
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

            <div className="flex items-center gap-6">
              <button
                onClick={prev}
                className="text-2xl hover:scale-125 transition transform"
              >
                &lt;
              </button>
              <button
                onClick={next}
                className="text-2xl hover:scale-125 transition transform"
              >
                &gt;
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
