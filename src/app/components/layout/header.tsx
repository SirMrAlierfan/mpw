
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headerLinks from "@/app/lib/header/headerLinks.json";
import { useLang } from "../../lib/context/context";

type LangItem = { id: number; code: string; name: string; flag?: string; falg?: string };

export default function Header() {

 
  const { lang, setLang, langApiBase } = useLang();

  const [languges, setLanguges] = useState<LangItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [langOpen, setLangOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${langApiBase}/languges`)
      .then((r) => r.json())
      .then((data) => setLanguges(data))
      .catch(() => {});
  }, [langApiBase]);

  const changeLang = (code: string) => {
    setLang(code);
    try {
      localStorage.setItem("lang", code);
    } catch {}
  };

  const langButton = headerLinks.find((item) => item.id === 0);
  const navbar = headerLinks.filter((item) => item.id !== 0);

  const flagSrc = (l?: LangItem) => l?.flag ?? l?.falg ?? "";

  return (
    <header className="container  sticky top-0 z-50 bg-[color:var(--bg-glass)] backdrop-blur-md shadow-md text-black text-nowrap">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-4 flex items-center justify-between gap-20">

        {/* Logo */}
        <div className="flex items-center flex-1 ">
          <div className="px-4 py-2 rounded-2xl shadow-sm font-extrabold text-2xl tracking-widest bg-white/90 text-[color:var(--text-strong)] border border-gray-200 cursor-pointer">
            E̳̿͟͞R̳̿͟͞P̳̿͟͞H̳̿͟͞U̳̿͟͞N̳̿͟͞
          </div>
        </div>

        {/* Desktop nav + language selector */}
        <nav className="hidden sm:flex flex-1 justify-center relative">
          <ul className="flex items-center gap-10 md:gap-14 lg:gap-20 ">
            {navbar.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href ?? "/"}
                  className="text-white   md:text-base lg:text-lg font-medium     transition px-3 py-2 rounded-xl hover:text-black hover:bg-indigo-50 min-w-[90px] "
                >
                  {link.title[lang as "fa" | "en"]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop language selector */}
        <div className="hidden sm:flex items-center ml-6 relative ">
          <button
            onClick={() => setLangOpen((s) => !s)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white hover:shadow-md transition cursor-pointer   "
          >
            <span className="w-6 h-4 rounded-sm overflow-hidden inline-block ">
              {languges.length ? (
                <img src={flagSrc(languges.find((l) => l.code === lang) ?? languges[0])} alt="flag" className="w-full h-full object-cover" />
              ) : (
                <span className="inline-block w-full h-full bg-gray-200" />
              )}
            </span>
            <span className="text-sm font-medium">{langButton?.title[lang as "fa" | "en"]}</span>
            <span>{langOpen ? "▲" : "▼"}</span>
          </button>

          {langOpen && (
            <div className="absolute top-14 right-0 w-56 bg-white rounded-2xl shadow-xl p-3 z-50">
              {languges.map((l) => (
                <button
                  key={l.id}
                  onClick={() => {
                    changeLang(l.code);
                    setLangOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 w-full text-left"
                >
                  <span className="w-7 h-5 rounded overflow-hidden">
                    {flagSrc(l) ? <img src={flagSrc(l)} className="w-full h-full object-cover" /> : <span className="bg-gray-200 block w-full h-full" />}
                  </span>
                  {l.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 flex-1 justify-end">

          {/* Mobile toggle (same button opens/closes) */}
          <button onClick={() => setMobileOpen((s) => !s)} className="sm:hidden p-2 rounded-lg border bg-white shadow-sm mx-5">
             
              <svg className="w-6 h-6" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: "60%" }}
            animate={{ x: 0 }}
            exit={{ x: "60%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 bg-white backdrop-blur-xl p-6 shadow-2xl "
          >
            <div className="flex items-center justify-between ">
              {/* Real logo */}
              <div className="px-4 py-2 rounded-2xl shadow-sm font-extrabold text-xl tracking-widest bg-white/90 text-[color:var(--text-strong)]">
                E̳̿͟͞R̳̿͟͞P̳̿͟͞H̳̿͟͞U̳̿͟͞N̳̿͟͞
              </div>

              {/* Same toggle button */}
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200">
                ✕
              </button>
            </div>

            <div className="mt-10 grid gap-6 text-white bg-[#0a0a0a]">
              {navbar.map((link) => (
                <Link
                  key={link.id}
                  href={link.href ?? "/"}
                  className="text-2xl font-semibold hover:opacity-70 transition hover:text-black hover:bg-white p-4 rounded-2xl"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.title[lang as "fa" | "en"]}
                </Link>
              ))}
            </div>

            {/* Language dropdown inside mobile menu */}
            <div className="mt-10">
              <button
                onClick={() => setLangOpen((s) => !s)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  <span className="w-6 h-4 rounded-sm overflow-hidden inline-block">
                    {languges.length ? (
                      <img src={flagSrc(languges.find((l) => l.code === lang) ?? languges[0])} className="w-full h-full object-cover" />
                    ) : (
                      <span className="bg-gray-300 block w-full h-full" />
                    )}
                  </span>
                  {langButton?.title[lang as "fa" | "en"]}
                </span>
                <span>{langOpen ? "▲" : "▼"}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="mt-3 bg-white rounded-2xl shadow-xl p-3"
                  >
                    {languges.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => {
                          changeLang(l.code);
                          setLangOpen(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 w-full text-left"
                      >
                        <span className="w-7 h-5 rounded overflow-hidden">
                          {flagSrc(l) ? <img src={flagSrc(l)} className="w-full h-full object-cover" /> : <span className="bg-gray-200 block w-full h-full" />}
                        </span>
                        {l.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
