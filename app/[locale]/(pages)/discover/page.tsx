"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapIcon, List, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { fetchDestinations, type Destination } from "@/lib/api";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

const filters = ["All", "Heritage", "Nature", "Urban", "Sahara", "Coastal"];

export default function DiscoverPage() {
  const t = useTranslations("discover");
  const locale = useLocale();
  const isArabic = locale === "ar" || locale === "ar-dz";
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showMap, setShowMap] = useState(true);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>(
    []
  );
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: t("chatResponse") },
      ]);
    }, 600);
  };

  useEffect(() => {
    fetchDestinations().then(setDestinations);
  }, []);

  const filtered = destinations.filter((d) => {
    const matchesFilter = activeFilter === "All" || d.category === activeFilter;
    const title = isArabic ? d.title_ar : d.title;
    const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen pt-16">
      {/* Search + Filters */}
      <div className="bg-white border-b border-zinc-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
            />
          </div>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeFilter === f
                    ? "bg-primary text-white shadow-md"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Map Toggle */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 bg-zinc-50 border-b border-zinc-200">
        <button
          onClick={() => setShowMap(true)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            showMap
              ? "bg-primary text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          <MapIcon size={14} />
          {t("map")}
        </button>
        <button
          onClick={() => setShowMap(false)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            !showMap
              ? "bg-primary text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-700"
          }`}
        >
          <List size={14} />
          {t("list")}
        </button>
      </div>

      {/* Split View */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Map */}
        <div
          className={`${showMap ? "block" : "hidden"} lg:block lg:w-1/2 h-[60vh] lg:h-auto relative z-0`}
        >
          {showMap && <Map destinations={filtered} />}
        </div>

        {/* Results */}
        <div
          className={`${showMap ? "hidden" : "block"} lg:block lg:w-1/2 overflow-y-auto lg:max-h-[calc(100vh-12rem)]`}
        >
          <div className="p-4 sm:p-6 space-y-4">
            <p className="text-xs sm:text-sm text-zinc-500 mb-3 sm:mb-4">
              {t("results", {
                count: filtered.length,
                total: destinations.length,
              })}
            </p>
            {filtered.map((d) => (
              <Link
                key={d.id}
                href={`/explore/${d.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex gap-4 p-4 rounded-2xl bg-white border border-zinc-200 hover:shadow-md hover:border-gold/30 transition-all group"
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 shrink-0 rounded-xl bg-zinc-200 relative overflow-hidden">
                  <Image
                    src={d.cover}
                    alt={d.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-zinc-900 group-hover:text-primary transition-colors">
                      {isArabic ? d.title_ar : d.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gold text-sm shrink-0">
                      <span>★</span>
                      <span className="font-medium">{d.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                    {isArabic ? d.description_ar : d.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-zinc-400">{isArabic ? d.region_ar : d.region}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {isArabic ? d.category_ar : d.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 sm:bottom-24 end-4 sm:end-6 z-50 w-[calc(100vw-2rem)] sm:w-80 h-96 rounded-2xl bg-white shadow-xl border border-zinc-200 flex flex-col overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 bg-primary text-white">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <span className="text-gold text-sm">✦</span>
              </div>
              <span className="font-semibold text-sm flex-1">
                {t("chatTitle")}
              </span>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.length === 0 && (
                <p className="text-xs text-zinc-400 text-center pt-8">
                  Ask me anything about destinations in Algeria.
                </p>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-zinc-100 text-zinc-700 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-zinc-200 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t("chatPlaceholder")}
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-100 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
                <button
                  onClick={handleSend}
                  className="p-2 rounded-xl bg-gold text-zinc-900 hover:bg-gold-light transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-4 sm:bottom-6 end-4 sm:end-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold text-zinc-900 shadow-lg flex items-center justify-center text-lg sm:text-xl hover:bg-gold-light transition-colors"
      >
        ✦
      </button>
    </div>
  );
}
