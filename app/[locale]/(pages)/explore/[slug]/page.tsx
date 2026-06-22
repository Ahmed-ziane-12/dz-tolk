"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "motion/react";
import { Compass } from "lucide-react";
import { fetchDestination, type Destination } from "@/lib/api";
import Image from "next/image";

const travelOptions = [
  {
    mode: "Air",
    icon: "✈️",
    detail: "45 min from Algiers to Ghardaïa Airport (GHA)",
  },
  {
    mode: "Road",
    icon: "🚌",
    detail: "6-7 hour drive via N1 highway from Algiers",
  },
];

export default function ExploreDetailPage() {
  const t = useTranslations("explore");
  const locale = useLocale();
  const isArabic = locale === "ar" || locale === "ar-dz";
  const params = useParams();
  const slug = params.slug as string;
  const [data, setData] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchDestination(slug).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
            <Compass size={48} className="text-primary" />
          </motion.div>
          <p className="text-zinc-500 text-sm font-medium">Loading...</p>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">
            {t("notFound")}
          </h2>
          <Link href="/discover" className="text-primary hover:underline">
            {t("backToDiscover")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="relative h-[35vh] sm:h-[50vh] min-h-[300px] sm:min-h-[400px] bg-gradient-to-br from-primary via-primary-dark to-primary flex items-end">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={data.cover}
            alt={""}
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <span className="px-2 sm:px-3 py-1 text-xs font-medium bg-gold text-zinc-900 rounded-full">
              {isArabic ? data.category_ar : data.category}
            </span>
            <span className="text-white/60 text-xs sm:text-sm">{isArabic ? data.region_ar : data.region}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            {isArabic ? data.title_ar : data.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/70 text-xs sm:text-sm">
            <span>🌡️ {data.temp}</span>
            <span>📍 {data.distance}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  {t("historyTitle")}
                </h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  {(isArabic ? data.history_ar : data.history).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* How to Get There */}
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                  {t("travelTitle")}
                </h2>
                <div className="space-y-3">
                  {travelOptions.map((opt) => (
                    <div
                      key={opt.mode}
                      className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-zinc-200"
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <h4 className="font-semibold text-zinc-900 text-sm">
                          {opt.mode}
                        </h4>
                        <p className="text-sm text-zinc-500">{opt.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-gold">✦</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{t("aiGuide")}</h3>
                    <p className="text-xs text-white/60">{t("aiGuideSub")}</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-4">
                  {t("aiGuideMessage")}
                </p>
                <button className="w-full py-3 bg-gold text-zinc-900 font-semibold rounded-xl hover:bg-gold-light transition-colors text-sm">
                  {t("askTolk")}
                </button>
              </div>

              <div className="rounded-2xl bg-surface border border-zinc-200 p-6">
                <h3 className="font-bold text-zinc-900 mb-3">
                  {t("bookingTitle")}
                </h3>
                <p className="text-sm text-zinc-500 mb-4">{t("bookingDesc")}</p>
                <button className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors text-sm">
                  {t("planVisit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Gems */}
      <section className="py-8 sm:py-12 bg-surface border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">
              {t("nearbyTitle")}
            </h2>
            <button className="text-primary text-sm font-medium hover:underline">
              {t("seeAll")} →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.nearbyGems.map((gem) => (
              <Link
                key={gem.slug}
                href={`/explore/${gem.slug}`}
                className="group relative h-48 rounded-2xl overflow-hidden bg-zinc-200 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="relative z-10 text-center p-4">
                  <h3 className="text-white font-semibold group-hover:text-gold transition-colors">
                    {gem.name}
                  </h3>
                  <p className="text-white/60 text-xs mt-1">{gem.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
