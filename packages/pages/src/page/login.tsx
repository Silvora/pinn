"use client";

import type { PlatformTarget } from "@pinn/types";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@pinn/ui/lib/utils";
import React, { useEffect, useRef, useState } from "react";

interface SignInPageProps {
  className?: string;
  platform?: PlatformTarget;
}

const stepTransition = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -48 },
  initial: { opacity: 0, y: 48 },
};


export function LoginPage({ className }: SignInPageProps) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code" | "success">("email");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleGoToSearch = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.history.pushState(null, "", "#search");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email) {
      setStep("code");
    }
  };

  useEffect(() => {
    if (step === "code") {
      const timer = setTimeout(() => {
        codeInputRefs.current[0]?.focus();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      return;
    }

    const nextCode = [...code];
    nextCode[index] = value;
    setCode(nextCode);

    if (value && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && value && nextCode.every((digit) => digit.length === 1)) {
      setTimeout(() => {
        setStep("success");
      }, 500);
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  const handleBackClick = () => {
    setStep("email");
    setCode(["", "", "", "", "", ""]);
  };

  return (
    <div className={cn("relative flex h-full w-full flex-col", className)}>
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col lg:flex-row">
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="w-full max-w-sm">
              <AnimatePresence mode="wait">
                {step === "email" ? (
                  <motion.div
                    key="email-step"
                    initial={stepTransition.initial}
                    animate={stepTransition.animate}
                    exit={stepTransition.exit}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] leading-[1.1] font-bold tracking-tight text-white">
                        Login
                      </h1>
                      {/* <p className="text-[1.2rem] font-light text-white/70">开始使用</p> */}
                    </div>

                    <div className="space-y-4">
                      <button className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-[2px] transition-colors hover:bg-white/10">
                        <span className="flex items-center justify-center gap-2">
                          <span className="text-lg">G</span>
                          <span>使用 Google 登录</span>
                        </span>
                      </button>

                      <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-sm text-white/40">或</span>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>

                      <form onSubmit={handleEmailSubmit}>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="请输入邮箱"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-full border border-white/10 px-4 py-3 text-center text-white backdrop-blur-[1px] focus:border-white/30 focus:outline-none"
                            required
                          />
                          <button
                            type="submit"
                            className="group absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                          >
                            <span className="relative block h-full w-full overflow-hidden">
                              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-full">
                                →
                              </span>
                              <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-300 group-hover:translate-x-0">
                                →
                              </span>
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>

                    <p className="pt-10 text-xs text-white/40" />
                  </motion.div>
                ) : step === "code" ? (
                  <motion.div
                    key="code-step"
                    initial={stepTransition.initial}
                    animate={stepTransition.animate}
                    exit={stepTransition.exit}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] leading-[1.1] font-bold tracking-tight text-white">
                        验证码已发送
                      </h1>
                      <p className="text-[1.25rem] font-light text-white/50">请输入收到的验证码</p>
                    </div>

                    <div className="w-full">
                      <div className="rounded-full border border-white/10 bg-transparent px-5 py-4">
                        <div className="flex items-center justify-center">
                          {code.map((digit, index) => (
                            <div key={index} className="flex items-center">
                              <div className="relative">
                                <input
                                  ref={(element) => {
                                    codeInputRefs.current[index] = element;
                                  }}
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  maxLength={1}
                                  value={digit}
                                  onChange={(event) => handleCodeChange(index, event.target.value)}
                                  onKeyDown={(event) => handleKeyDown(index, event)}
                                  className="w-8 appearance-none bg-transparent text-center text-xl text-white focus:outline-none focus:ring-0"
                                  style={{ caretColor: "transparent" }}
                                />
                                {!digit ? (
                                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl text-white">0</span>
                                  </div>
                                ) : null}
                              </div>
                              {index < 5 ? <span className="text-xl text-white/20">|</span> : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <motion.p
                        className="cursor-pointer text-sm text-white/50 transition-colors hover:text-white/70"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        重新发送验证码
                      </motion.p>
                    </div>

                    <div className="flex w-full gap-3">
                      <motion.button
                        onClick={handleBackClick}
                        className="w-[30%] rounded-full bg-white px-8 py-3 font-medium text-black transition-colors hover:bg-white/90"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        返回
                      </motion.button>
                      <motion.button
                        className={`flex-1 rounded-full border py-3 font-medium transition-all duration-300 ${
                          code.every((digit) => digit !== "")
                            ? "cursor-pointer border-transparent bg-white text-black hover:bg-white/90"
                            : "cursor-not-allowed border-white/10 bg-[#111] text-white/50"
                        }`}
                        disabled={!code.every((digit) => digit !== "")}
                      >
                        继续
                      </motion.button>
                    </div>

                    <div className="pt-16">
                      <p className="text-xs text-white/40" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-step"
                    initial={stepTransition.initial}
                    animate={stepTransition.animate}
                    exit={stepTransition.exit}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                    className="space-y-6 text-center"
                  >
                    <div className="space-y-1">
                      <h1 className="text-[2.5rem] leading-[1.1] font-bold tracking-tight text-white">登录成功</h1>
                      <p className="text-[1.25rem] font-light text-white/50">欢迎回来</p>
                    </div>

                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="py-10"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white to-white/70">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      onClick={handleGoToSearch}
                      className="w-full rounded-full bg-white py-3 font-medium text-black transition-colors hover:bg-white/90"
                    >
                      进入检索页
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
