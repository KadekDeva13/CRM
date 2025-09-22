/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Button from "../../components/UI/button";
import { Field, inputCls } from "../../components/UI/field";
import { loginSuccessToast, loginErrorToast } from "../../components/Toast/LoginToast";

export default function Login(): React.ReactElement {
  const navigate = useNavigate();
  const controls = useAnimation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 0.6 } });
  }, [controls]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const ok = form.email.trim() !== "" && form.password.trim() !== "";
      await new Promise((r) => setTimeout(r, 600));
      if (!ok) throw new Error("Email & Password Required");
      loginSuccessToast();
      await controls.start({ opacity: 0, transition: { duration: 0.4 } });
      navigate("/overview");
    } catch (err: any) {
      loginErrorToast(err?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
   className="text-white"
      initial={{ opacity: 0 }} 
      animate={controls}
    >
      <div className="absolute top-6 left-6 flex items-center gap-3 font-helectiva">
        <img src="/image/Guirez.png" alt="guirez" className="h-[40px] w-auto" />
        <span className="text-3xl text-white/70">|</span>
        <span className="text-3xl tracking-[0.18em] font-helectiva">CRM</span>
      </div>

      <h1 className="mb-8 text-4xl font-semibold tracking-wide font-helectiva">
        Sign In.
      </h1>

      <form onSubmit={onSubmit} className="space-y-6 max-w-sm">
        <Field
          label={
            <span className="text-white/70 text-[17px] font-helectiva">
              Username
            </span>
          }
          htmlFor="email"
        >
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-teal-300/90">
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 4.60639V15.1786C20 15.6616 19.8141 16.1249 19.4831 16.4665C19.1522 16.8081 18.7033 17 18.2353 17H1.76471C1.29668 17 0.847821 16.8081 0.516875 16.4665C0.185928 16.1249 4.26387e-06 15.6616 4.26387e-06 15.1786V4.60639L7.33706 11.0269C8.08099 11.678 9.02466 12.0353 10 12.0353C10.9753 12.0353 11.919 11.678 12.6629 11.0269L20 4.60639ZM18.2353 5.25081e-07C18.4503 0.000245976 18.6636 0.0405592 18.8647 0.119001C19.1539 0.232681 19.4088 0.423295 19.6035 0.6715C19.7091 0.804982 19.7958 0.95317 19.8612 1.11168C19.9376 1.29868 19.9847 1.50147 19.9965 1.71457L20 1.82143V2.42857L11.1453 10.2243C10.8406 10.4926 10.4564 10.6459 10.0561 10.659C9.65575 10.6722 9.26299 10.5443 8.94236 10.2965L8.85471 10.2237L4.26387e-06 2.42857V1.82143C-0.000714854 1.48429 0.0895408 1.1536 0.260657 0.866427C0.431774 0.579251 0.67699 0.346931 0.968828 0.195501C1.21558 0.0667573 1.48823 -0.000216359 1.76471 5.25081e-07H18.2353Z"
                  fill="#0F5A62"
                />
              </svg>
            </span>
            <input
              id="email"
              name="email"
              type="text"
              value={form.email}
              onChange={onChange}
              className={[
                inputCls,
                "bg-transparent text-white placeholder-white/40",
                "w-full max-w-[369px] h-[72px] rounded-xl border-[1.5px] pl-10",
                "border-white/60 focus:border-white focus:ring-white/10",
              ].join(" ")}
            />
          </div>
        </Field>

        <Field
          label={
            <span className="text-white/60 text-[17px] font-helectiva">
              Password
            </span>
          }
          htmlFor="password"
        >
          <div className="relative ">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-teal-300/70">
              <svg
                width="20"
                height="24"
                viewBox="0 0 16 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 20.4751C5.66665 19.8918 3.75 18.5376 2.25 16.4126C0.75 14.2876 0 11.9584 0 9.42512V3.4751L8 0.475098L16 3.4751V9.42512C16 11.9584 15.25 14.2876 13.75 16.4126C12.25 18.5376 10.3334 19.8918 8 20.4751ZM5 14.5001H11V9.50012H10V8.50012C10 7.95012 9.80415 7.47927 9.4125 7.08762C9.02085 6.69592 8.55 6.50012 8 6.50012C7.45 6.50012 6.97915 6.69592 6.5875 7.08762C6.19585 7.47927 6 7.95012 6 8.50012V9.50012H5V14.5001ZM6.75 9.50012V8.50012C6.75 8.16677 6.875 7.88762 7.125 7.66262C7.375 7.43762 7.66665 7.32512 8 7.32512C8.33335 7.32512 8.625 7.43767 8.875 7.66287C9.125 7.88817 9.25 8.16727 9.25 8.50012V9.50012H6.75Z"
                  fill="#0F5A62"
                />
              </svg>
            </span>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className={[
                inputCls,
                "bg-transparent text-white placeholder-white/40",
                "w-full max-w-[369px] h-[72px] rounded-xl border-[1.5px] pl-10",
                "border-white/60 focus:border-white focus:ring-white/10",
              ].join(" ")}
            />
          </div>
        </Field>

        <div className="pt-4 font-helectiva">
          <Button
            type="submit"
            isLoading={loading}
            className="w-full max-w-[369px] h-[72px]  rounded-xl bg-[#112D30]/90 hover:bg-[#0E3F3A] text-white tracking-[0.2em] font-helectiva text-2xl"
          >
            SIGN IN
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
