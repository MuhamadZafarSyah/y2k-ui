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
  ArrowLeftIcon,
  LayoutGridIcon,
  LayoutListIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

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

const categories = ["All", ...Array.from(new Set(blocks.map((b) => b.category)))]

export default function BlocksPage() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list")

  const filteredBlocks =
    activeCategory === "All"
      ? blocks
      : blocks.filter((b) => b.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />

      {/* Hero Section */}
      <div className="border-b-2 border-y2k-ink bg-y2k-panel">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Badge variant="blue">
              <LayersIcon className="size-3" />
              Blocks
            </Badge>
            <Badge variant="pink">20+ blocks</Badge>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-y2k-ink md:text-4xl">
            Pre-built component compositions
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-y2k-ink/70">
            Beautifully designed, copy-paste ready blocks built with Y2K UI
            components. Preview, view code, and customize to your needs.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-12 z-40 border-b-2 md:px-12 px-0 border-y2k-ink bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
          {/* Category filters */}
          <div className="flex items-center gap-1.5 py-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "inline-flex h-7 items-center rounded border-2 px-3 text-xs font-bold transition-all whitespace-nowrap",
                  activeCategory === cat
                    ? "border-y2k-ink bg-y2k-lemon text-y2k-ink shadow-[1px_1px_0px_#1b1b3a]"
                    : "border-y2k-ink/30 text-y2k-ink/60 hover:border-y2k-ink hover:text-y2k-ink hover:bg-y2k-panel",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          {/* <div className="flex items-center gap-1 rounded border-2 border-y2k-ink bg-card p-0.5">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded transition-all",
                viewMode === "grid"
                  ? "bg-y2k-blue text-y2k-ink"
                  : "text-y2k-ink/50 hover:text-y2k-ink",
              )}
            >
              <LayoutGridIcon className="size-3" />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => setViewMode("list")}
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded transition-all",
                viewMode === "list"
                  ? "bg-y2k-blue text-y2k-ink"
                  : "text-y2k-ink/50 hover:text-y2k-ink",
              )}
            >
              <LayoutListIcon className="size-3" />
            </button>
          </div> */}
        </div>
      </div>

      {/* Blocks Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        {filteredBlocks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 flex size-14 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-panel text-y2k-ink">
              <LayersIcon className="size-6" />
            </div>
            <h3 className="text-sm font-bold text-y2k-ink">No blocks found</h3>
            <p className="mt-1 text-xs text-y2k-ink/60">
              Try selecting a different category.
            </p>
          </div>
        ) : (
          <div
            className={cn(
              "gap-14",
              viewMode === "grid"
                ? "grid grid-cols-1 lg:grid-cols-2"
                : "flex flex-col",
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
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-y2k-ink bg-y2k-panel">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-[10px] font-bold">
              Y
            </span>
            <span className="text-xs font-bold text-y2k-ink">
              Y2K UI Blocks
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="text-xs font-semibold text-y2k-ink/60 hover:text-y2k-ink transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/"
              className="text-xs font-semibold text-y2k-ink/60 hover:text-y2k-ink transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
