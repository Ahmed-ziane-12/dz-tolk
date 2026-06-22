"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { UtensilsCrossed, Hammer, ScrollText, Palette } from "lucide-react";
import { fetchDestinations, type Destination } from "@/lib/api";

const experiences = [
  { key: "gastronomy", Icon: UtensilsCrossed },
  { key: "craftsmanship", Icon: Hammer },
  { key: "tradition", Icon: ScrollText },
  { key: "art", Icon: Palette },
];

const features = [
  { title: "Real-time Translation", desc: "Break language barriers instantly" },
  { title: "Local Insights", desc: "Discover hidden gems only locals know" },
  {
    title: "Cultural Context",
    desc: "Understand the stories behind every site",
  },
  { title: "Trip Planning", desc: "Get personalized itineraries in seconds" },
];

export default function LandingPage() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isArabic = locale === "ar" || locale === "ar-dz";
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetchDestinations().then((data) => setDestinations(data.slice(0, 4)));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/p.jpg"
            alt="Sahara landscape"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-10 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          <div className="flex items-center gap-2 sm:gap-3 max-w-xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm sm:text-base"
              />
            </div>
            <button className="px-4 sm:px-6 py-3 sm:py-4 bg-gold text-zinc-900 font-semibold rounded-xl hover:bg-gold-light transition-colors text-sm sm:text-base">
              {t("hero.search")}
            </button>
          </div>

          {/* Tolk-Bot */}
          <div className="glass rounded-2xl p-5 max-w-sm mx-auto">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <span className="text-gold text-lg">✦</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-white/90 text-sm font-medium mb-1">
                  {t("hero.botGreeting")}
                </p>
                <p className="text-white/60 text-xs">{t("hero.botHint")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-12 sm:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-zinc-900">
              {t("destinations.title")}
            </h2>
            <Link
              href="/discover"
              className="text-primary font-medium text-sm hover:underline"
            >
              {t("destinations.viewAll")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((d) => (
              <Link
                key={d.id}
                href={`/explore/${d.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <Image
                  src={d.cover}
                  alt={d.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 text-xs font-medium bg-gold text-zinc-900 rounded-full">
                  {isArabic ? d.category_ar : d.category}
                </span>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-semibold text-lg">
                    {isArabic ? d.title_ar : d.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Experiences */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-surface via-white to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900">
              {t("experiences.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experiences.map(({ key, Icon }) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-2xl bg-white border border-zinc-200 p-6 hover:border-gold/40 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full -z-0" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon size={24} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-zinc-900 mb-1.5">
                    {t(`experiences.${key}`)}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {t(`experiences.${key}Desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Feature Showcase */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-primary via-primary-dark to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t("ai.title")}
              </h2>
              <p className="text-white/60 mb-8">{t("ai.subtitle")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/10 border border-white/10"
                  >
                    <span className="mt-1 text-gold text-lg shrink-0">◆</span>
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {f.title}
                      </h4>
                      <p className="text-xs text-white/60">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-gold text-sm">✦</span>
                </div>
                <span className="font-semibold text-white text-sm">
                  Tolk Guide
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-white/80">{t("ai.chat1")}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gold/20 rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-white">{t("ai.chat2")}</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-white/80">{t("ai.chat3")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
