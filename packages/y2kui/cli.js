#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REGISTRY_URL = "https://y2k-ui.web.id/r/{name}.json";
const REGISTRY_NAME = "@y2k";
const CWD = process.cwd();

const BANNER = `
 ██╗   ██╗██████╗ ██╗  ██╗        ██╗   ██╗██╗
 ╚██╗ ██╔╝╚════██╗██║ ██╔╝        ██║   ██║██║
  ╚████╔╝  █████╔╝█████╔╝   ████╗ ██║   ██║██║
   ╚██╔╝  ██╔═══╝ ██════██╗ ╚═══╝  ██║   ██║██║
    ██║   ███████╗██    ██║        ╚██████╔╝██║
    ╚═╝   ╚══════╝╚═╝   ╚═╝          ╚═════╝ ╚═╝`;

const args = process.argv.slice(2);
const command = args[0];

// ── Helpers ──────────────────────────────────────────────────────────────────

function run(cmd) {
  try {
    execSync(cmd, { stdio: "inherit", cwd: CWD });
  } catch {
    process.exit(1);
  }
}

function detectPackageManager() {
  if (fs.existsSync(path.join(CWD, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(CWD, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(CWD, "bun.lockb"))) return "bun";
  return "npm";
}

function installPackages(deps, isDev) {
  if (!deps.length) return;
  const pm = detectPackageManager();
  const devFlag = isDev
    ? { npm: "--save-dev", pnpm: "-D", yarn: "-D", bun: "--dev" }[pm]
    : "";
  const cmd =
    pm === "npm"
      ? `npm install ${devFlag} ${deps.join(" ")}`
      : `${pm} add ${devFlag} ${deps.join(" ")}`;
  run(cmd.trim());
}

const CORE_DEPS = [
  "radix-ui",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
  "lucide-react",
  "tw-animate-css",
];

const CORE_DEV_DEPS = ["tailwindcss", "@tailwindcss/postcss", "shadcn"];

function ensureCoreDeps() {
  const nodeModules = path.join(CWD, "node_modules");

  const missing = CORE_DEPS.filter((d) => {
    const pkgDir = path.join(nodeModules, d);
    return !fs.existsSync(pkgDir);
  });

  const missingDev = CORE_DEV_DEPS.filter((d) => {
    const pkgDir = path.join(nodeModules, d);
    return !fs.existsSync(pkgDir);
  });

  if (missing.length > 0) {
    console.log(`\n  Installing deps: ${missing.join(", ")}`);
    installPackages(missing, false);
  }
  if (missingDev.length > 0) {
    console.log(`\n  Installing dev deps: ${missingDev.join(", ")}`);
    installPackages(missingDev, true);
  }
}

// ── Setup Functions ──────────────────────────────────────────────────────────

function isRegistryConfigured() {
  const configPath = path.join(CWD, "components.json");
  if (!fs.existsSync(configPath)) return false;
  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return !!(
      config.registries &&
      config.registries[REGISTRY_NAME] &&
      config.registries[REGISTRY_NAME].url === REGISTRY_URL
    );
  } catch {
    return false;
  }
}

function ensureComponentsJson() {
  const configPath = path.join(CWD, "components.json");
  let config = {};

  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } catch {
      config = {};
    }
  }

  let changed = false;

  if (!config.$schema) {
    config.$schema = "https://ui.shadcn.com/schema.json";
    changed = true;
  }
  if (!config.style) {
    config.style = "radix-nova";
    changed = true;
  }
  if (config.rsc === undefined) {
    config.rsc = true;
    changed = true;
  }
  if (config.tsx === undefined) {
    config.tsx = true;
    changed = true;
  }
  if (!config.tailwind) {
    config.tailwind = {
      config: "",
      css: "app/globals.css",
      baseColor: "neutral",
      cssVariables: true,
      prefix: "",
    };
    changed = true;
  }
  if (!config.iconLibrary) {
    config.iconLibrary = "lucide";
    changed = true;
  }
  if (!config.aliases) {
    config.aliases = {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks",
    };
    changed = true;
  }
  if (!config.registries) config.registries = {};
  if (!config.registries[REGISTRY_NAME]) {
    config.registries[REGISTRY_NAME] = { url: REGISTRY_URL };
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
    console.log("  Created / updated components.json");
  }
}

function ensureGlobalsCss() {
  const cssPath = path.join(CWD, "app", "globals.css");
  const cssDir = path.dirname(cssPath);

  if (!fs.existsSync(cssDir)) {
    fs.mkdirSync(cssDir, { recursive: true });
  }

  const y2kBlock = `
/* ── Y2K UI Tokens ── */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-y2k-ink: var(--y2k-ink);
  --color-y2k-blue: var(--y2k-blue);
  --color-y2k-pink: var(--y2k-pink);
  --color-y2k-lilac: var(--y2k-lilac);
  --color-y2k-mint: var(--y2k-mint);
  --color-y2k-lemon: var(--y2k-lemon);
  --color-y2k-panel: var(--y2k-panel);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
}

:root {
  --background: oklch(0.97 0.02 280);
  --foreground: var(--y2k-ink);
  --card: oklch(1 0 0);
  --card-foreground: var(--y2k-ink);
  --popover: oklch(1 0 0);
  --popover-foreground: var(--y2k-ink);
  --primary: var(--y2k-blue);
  --primary-foreground: var(--y2k-ink);
  --secondary: var(--y2k-panel);
  --secondary-foreground: var(--y2k-ink);
  --muted: var(--y2k-panel);
  --muted-foreground: oklch(0.45 0.02 280);
  --accent: var(--y2k-pink);
  --accent-foreground: var(--y2k-ink);
  --destructive: oklch(0.6 0.22 27);
  --border: var(--y2k-ink);
  --input: var(--y2k-ink);
  --ring: var(--y2k-pink);
  --radius: 0.5rem;

  --y2k-ink: #1b1b3a;
  --y2k-blue: #8ed1fc;
  --y2k-pink: #ff8fcf;
  --y2k-lilac: #b69cff;
  --y2k-mint: #8ff0d0;
  --y2k-lemon: #ffe45e;
  --y2k-panel: #d7dde8;
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;

  if (fs.existsSync(cssPath)) {
    const existing = fs.readFileSync(cssPath, "utf-8");
    if (existing.includes("--y2k-ink")) {
      return;
    }
    fs.appendFileSync(cssPath, y2kBlock);
    console.log("  Appended Y2K tokens to globals.css");
  } else {
    fs.writeFileSync(cssPath, y2kBlock.trimStart());
    console.log("  Created app/globals.css with Y2K tokens");
  }
}

function ensureUtilsTs() {
  const utilsDir = path.join(CWD, "lib");
  const utilsFile = path.join(utilsDir, "utils.ts");

  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }

  if (fs.existsSync(utilsFile)) return;

  fs.writeFileSync(
    utilsFile,
    `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`,
  );
  console.log("  Created lib/utils.ts");
}

function fullSetup() {
  ensureComponentsJson();
  ensureGlobalsCss();
  ensureUtilsTs();
}

// ── Commands ─────────────────────────────────────────────────────────────────

switch (command) {
  case "init": {
    console.log(BANNER);
    console.log("\n  Setting up Y2K UI...\n");

    fullSetup();

    console.log("\n  Installing dependencies...");
    installPackages(CORE_DEPS, false);
    installPackages(CORE_DEV_DEPS, true);

    console.log(`\n  Done! Y2K UI is ready.\n`);
    console.log(`  npx y2kui@latest add button\n`);
    break;
  }

  case "add": {
    const components = args.slice(1);
    if (components.length === 0) {
      console.error("  Usage: y2kui add <component> [component...]");
      process.exit(1);
    }

    console.log(BANNER);

    if (!isRegistryConfigured()) {
      console.log("\n  First time setup...\n");
      fullSetup();
      console.log("\n  Installing core dependencies...");
      installPackages(CORE_DEPS, false);
      installPackages(CORE_DEV_DEPS, true);
    }

    ensureCoreDeps();

    const prefixed = components.map((c) => `${REGISTRY_NAME}/${c}`);
    console.log(`\n  Adding: ${components.join(", ")}\n`);
    run(`npx shadcn@latest add ${prefixed.join(" ")}`);

    console.log(`\n  Done!\n`);
    break;
  }

  default: {
    console.log(BANNER);
    if (command) {
      console.error(`\n  Unknown command: ${command}\n`);
    }
    console.log("  Commands:\n");
    console.log("    y2kui init          Set up Y2K UI in your project");
    console.log("    y2kui add <name>    Add a Y2K component\n");
    console.log("  Examples:\n");
    console.log("    npx y2kui@latest init");
    console.log("    npx y2kui@latest add button");
    console.log("    npx y2kui@latest add card dialog input\n");
    process.exit(command ? 1 : 0);
  }
}
