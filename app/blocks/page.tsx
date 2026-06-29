"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NavHeader } from "@/components/nav-header"
import { BlockPreview } from "@/components/docs/block-preview"
import { blockSources } from "@/lib/block-sources"
import {
  LoginFormBlock,
  DashboardStatsBlock,
  PricingCardsBlock,
  HeroSectionBlock,
  ProfileCardBlock,
  SettingsPanelBlock,
  DataTableBlock,
  AuthTabsBlock,
  TestimonialsBlock,
  SupportCenterBlock,
  NewsletterBlock,
  FeatureGridBlock,
  ContactFormBlock,
  NotificationCenterBlock,
  OnboardingStepsBlock,
  TeamMembersBlock,
  BlogCardsBlock,
  MusicPlayerBlock,
  WeatherWidgetBlock,
} from "@/components/blocks"
import {
  LayersIcon,
  LayoutGridIcon,
  LayoutListIcon,
  SparklesIcon,
  ZapIcon,
  StarIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useScrollReveal, useStaggerReveal } from "@/components/animations/use-gsap-reveal"
import { HighlightReveal } from "@/components/animations/highlight-reveal"

type BlockDef = {
  name: string
  title: string
  description: string
  category: string
  preview: React.ReactNode
}

const blocks: BlockDef[] = [
  {
    name: "login-01",
    title: "Login Form",
    description: "A clean login form with email, password, and remember me.",
    category: "Authentication",
    preview: <LoginFormBlock />,
  },
  {
    name: "auth-01",
    title: "Auth Tabs",
    description: "Login and register tabs with social auth options.",
    category: "Authentication",
    preview: <AuthTabsBlock />,
  },
  {
    name: "dashboard-01",
    title: "Dashboard Stats",
    description: "Stats cards with recent sales and device overview.",
    category: "Dashboard",
    preview: <DashboardStatsBlock />,
  },
  {
    name: "pricing-01",
    title: "Pricing Cards",
    description: "Three-tier pricing cards with feature lists.",
    category: "Marketing",
    preview: <PricingCardsBlock />,
  },
  {
    name: "hero-01",
    title: "Hero Section",
    description: "Landing page hero with CTA buttons and badges.",
    category: "Marketing",
    preview: <HeroSectionBlock />,
  },
  {
    name: "testimonials-01",
    title: "Testimonials",
    description: "Customer review cards with ratings and social actions.",
    category: "Marketing",
    preview: <TestimonialsBlock />,
  },
  {
    name: "profile-01",
    title: "Profile Card",
    description: "User profile card with avatar, badges, and progress.",
    category: "Social",
    preview: <ProfileCardBlock />,
  },
  {
    name: "settings-01",
    title: "Settings Panel",
    description: "Tabbed settings with general, notifications, and appearance.",
    category: "Dashboard",
    preview: <SettingsPanelBlock />,
  },
  {
    name: "table-01",
    title: "Data Table",
    description: "Invoice table with search, filters, and pagination.",
    category: "Dashboard",
    preview: <DataTableBlock />,
  },
  {
    name: "support-01",
    title: "Support Center",
    description: "Help center with search, quick links, and FAQ accordion.",
    category: "Marketing",
    preview: <SupportCenterBlock />,
  },
  {
    name: "newsletter-01",
    title: "Newsletter Signup",
    description: "Email subscription form with badges and social proof.",
    category: "Marketing",
    preview: <NewsletterBlock />,
  },
  {
    name: "features-01",
    title: "Feature Grid",
    description: "Six feature cards with icons highlighting key benefits.",
    category: "Marketing",
    preview: <FeatureGridBlock />,
  },
  {
    name: "contact-01",
    title: "Contact Form",
    description: "Contact form with info sidebar and subject selector.",
    category: "Forms",
    preview: <ContactFormBlock />,
  },
  {
    name: "notifications-01",
    title: "Notification Center",
    description: "Notification list with unread indicators and actions.",
    category: "Dashboard",
    preview: <NotificationCenterBlock />,
  },
  {
    name: "onboarding-01",
    title: "Onboarding Steps",
    description: "Multi-step wizard with progress indicator and status.",
    category: "Forms",
    preview: <OnboardingStepsBlock />,
  },
  {
    name: "team-01",
    title: "Team Members",
    description: "Team grid with avatars, roles, and social links.",
    category: "Social",
    preview: <TeamMembersBlock />,
  },
  {
    name: "blog-01",
    title: "Blog Cards",
    description: "Article preview cards with categories and engagement stats.",
    category: "Content",
    preview: <BlogCardsBlock />,
  },
  {
    name: "music-player-01",
    title: "Music Player",
    description: "Audio player with controls, progress, and volume slider.",
    category: "Media",
    preview: <MusicPlayerBlock />,
  },
  {
    name: "weather-01",
    title: "Weather Widget",
    description: "Weather display with current conditions and 5-day forecast.",
    category: "Widgets",
    preview: <WeatherWidgetBlock />,
  },
]

const categoryColors: Record<string, string> = {
  All: "bg-y2k-panel",
  Authentication: "bg-y2k-lemon",
  Dashboard: "bg-y2k-blue",
  Marketing: "bg-y2k-lilac",
  Social: "bg-y2k-pink",
  Forms: "bg-y2k-mint",
  Content: "bg-y2k-blue",
  Media: "bg-y2k-pink",
  Widgets: "bg-y2k-lemon",
}

const categories = ["All", ...Array.from(new Set(blocks.map((b) => b.category)))]

function HeroSection() {
  const heroRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 })
  const badgeRef = useScrollReveal<HTMLDivElement>({ y: 15, duration: 0.5, delay: 0.05 })
  const statsRef = useScrollReveal<HTMLDivElement>({ y: 20, duration: 0.6, delay: 0.2 })

  return (
    <div className="relative overflow-hidden border-b-2 border-y2k-ink bg-y2k-panel">
      {/* Decorative sparkle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(#1b1b3a 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Floating decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span
          className="absolute left-[8%] top-[20%] text-2xl opacity-20 animate-float"
          style={{ animationDelay: "0s" }}
        >
          <StarIcon className="size-5 text-y2k-lemon" />
        </span>
        <span
          className="absolute right-[12%] top-[30%] text-2xl opacity-20 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <SparklesIcon className="size-5 text-y2k-pink" />
        </span>
        <span
          className="absolute left-[20%] bottom-[25%] text-2xl opacity-15 animate-float"
          style={{ animationDelay: "3s" }}
        >
          <ZapIcon className="size-5 text-y2k-blue" />
        </span>
        <span
          className="absolute right-[25%] bottom-[20%] text-2xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        >
          <StarIcon className="size-4 text-y2k-lilac" />
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 text-center">
        {/* Badge row */}
        <div ref={badgeRef} className="mb-4 flex items-center justify-center gap-2">
          <Badge
            variant="blue"
            className="border-2 border-y2k-ink px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_#1b1b3a]"
          >
            <LayersIcon className="size-3" />
            Blocks
          </Badge>
          <Badge
            variant="pink"
            className="border-2 border-y2k-ink px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_#1b1b3a]"
          >
            20+ blocks
          </Badge>
          <Badge
            variant="lemon"
            className="border-2 border-y2k-ink px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_#1b1b3a]"
          >
            {categories.length - 1} categories
          </Badge>
        </div>

        {/* Heading with highlight reveal */}
        <div ref={heroRef}>
          <h1 className="text-3xl font-black tracking-tight text-y2k-ink md:text-5xl lg:text-6xl">
            <HighlightReveal color="var(--y2k-lemon)" delay={0.2} duration={0.7}>
              Pre-built
            </HighlightReveal>{" "}
            component compositions
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-y2k-ink/65 md:text-base">
            Beautifully designed, copy-paste ready blocks built with Y2K UI
            components. Preview, view code, and customize to your needs.
          </p>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="mt-8 flex items-center justify-center gap-6 md:gap-10"
        >
          {[
            { value: "20+", label: "Blocks", color: "border-y2k-blue text-y2k-blue" },
            { value: "8", label: "Categories", color: "border-y2k-pink text-y2k-pink" },
            { value: "100%", label: "Open Source", color: "border-y2k-mint text-y2k-mint" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 rounded-lg border-2 border-y2k-ink bg-white px-5 py-3 shadow-[2px_2px_0px_#1b1b3a]"
            >
              <span className={cn("text-xl font-black md:text-2xl", stat.color)}>
                {stat.value}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-y2k-ink/50">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Toolbar({
  activeCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
}: {
  activeCategory: string
  onCategoryChange: (cat: string) => void
  viewMode: "grid" | "list"
  onViewModeChange: (mode: "grid" | "list") => void
}) {
  const toolbarRef = useScrollReveal<HTMLDivElement>({ y: 10, duration: 0.4, threshold: 0.05 })

  return (
    <div
      ref={toolbarRef}
      className="sticky top-12 z-40 border-b-2 border-y2k-ink bg-white md:px-12 px-0"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
        {/* Category filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none px-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            const accent = categoryColors[cat] ?? "bg-y2k-panel"
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  "group inline-flex h-7 items-center rounded border-2 px-3 text-xs font-bold transition-all duration-200 whitespace-nowrap",
                  isActive
                    ? "border-y2k-ink text-y2k-ink shadow-[2px_2px_0px_#1b1b3a] scale-105"
                    : "border-y2k-ink/25 text-y2k-ink/50 hover:border-y2k-ink hover:text-y2k-ink hover:shadow-[1px_1px_0px_#1b1b3a]",
                  isActive ? accent : "hover:bg-y2k-panel"
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* View mode toggle */}
        <div className="hidden sm:flex items-center gap-1 rounded-lg border-2 border-y2k-ink bg-y2k-panel p-1">
          <button
            type="button"
            aria-label="Grid view"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200",
              viewMode === "grid"
                ? "bg-y2k-blue text-y2k-ink shadow-[1px_1px_0px_#1b1b3a]"
                : "text-y2k-ink/40 hover:text-y2k-ink hover:bg-white/50"
            )}
          >
            <LayoutGridIcon className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label="List view"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200",
              viewMode === "list"
                ? "bg-y2k-blue text-y2k-ink shadow-[1px_1px_0px_#1b1b3a]"
                : "text-y2k-ink/40 hover:text-y2k-ink hover:bg-white/50"
            )}
          >
            <LayoutListIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

function EmptyState() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 20, duration: 0.5 })

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-lg border-2 border-y2k-ink bg-y2k-panel text-y2k-ink shadow-[2px_2px_0px_#1b1b3a]">
        <LayersIcon className="size-7" />
      </div>
      <h3 className="text-sm font-bold text-y2k-ink">No blocks found</h3>
      <p className="mt-1 text-xs text-y2k-ink/55">
        Try selecting a different category.
      </p>
    </div>
  )
}

function BlockGrid({
  blocks: filteredBlocks,
  viewMode,
}: {
  blocks: BlockDef[]
  viewMode: "grid" | "list"
}) {
  const gridRef = useStaggerReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.06,
    threshold: 0.05,
  })

  if (filteredBlocks.length === 0) {
    return <EmptyState />
  }

  return (
    <div
      ref={gridRef}
      className={cn(
        viewMode === "grid"
          ? "grid grid-cols-1 gap-10 lg:grid-cols-2"
          : "flex flex-col gap-10"
      )}
    >
      {filteredBlocks.map((block) => (
        <BlockPreview
          key={block.name}
          name={block.name}
          title={block.title}
          description={block.description}
          category={block.category}
          preview={block.preview}
          source={blockSources[block.name] || "// Source not available"}
        />
      ))}
    </div>
  )
}

function Footer() {
  const footerRef = useScrollReveal<HTMLDivElement>({ y: 15, duration: 0.5, threshold: 0.1 })

  return (
    <footer ref={footerRef} className="border-t-2 border-y2k-ink bg-y2k-panel">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-6 items-center justify-center rounded-md border-2 border-y2k-ink bg-y2k-lemon shadow-[1px_1px_0px_#1b1b3a]">
            <span className="text-[11px] font-black text-y2k-ink">Y</span>
          </div>
          <div>
            <span className="text-xs font-bold text-y2k-ink">Y2K UI Blocks</span>
            <span className="ml-2 hidden text-[10px] text-y2k-ink/40 sm:inline">
              Built with GSAP + Y2K design system
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/docs"
            className="rounded-md border border-y2k-ink/20 px-2.5 py-1 text-xs font-semibold text-y2k-ink/55 transition-all duration-200 hover:border-y2k-ink hover:text-y2k-ink hover:bg-y2k-lemon/30"
          >
            Docs
          </Link>
          <Link
            href="/"
            className="rounded-md border border-y2k-ink/20 px-2.5 py-1 text-xs font-semibold text-y2k-ink/55 transition-all duration-200 hover:border-y2k-ink hover:text-y2k-ink hover:bg-y2k-lemon/30"
          >
            Home
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default function BlocksPage() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list")

  const filteredBlocks =
    activeCategory === "All"
      ? blocks
      : blocks.filter((b) => b.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">

      <HeroSection />

      <Toolbar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <BlockGrid
          key={activeCategory}
          blocks={filteredBlocks}
          viewMode={viewMode}
        />
      </main>

      <Footer />
    </div>
  )
}
