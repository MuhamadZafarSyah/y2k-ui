#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const REGISTRY_URL = "https://y2k-ui.web.id/r";
const REGISTRY_NAME = "y2k";

const args = process.argv.slice(2);
const command = args[0];

function run(cmd) {
  try {
    execSync(cmd, { stdio: "inherit", cwd: process.cwd() });
  } catch {
    process.exit(1);
  }
}

function addRegistryToComponentsJson() {
  const configPath = path.join(process.cwd(), "components.json");
  let config = {};

  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    } catch {
      config = {};
    }
  }

  if (!config.registries) config.registries = {};
  if (!config.registries[REGISTRY_NAME]) {
    config.registries[REGISTRY_NAME] = { url: REGISTRY_URL };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
    console.log(`\nAdded registry "${REGISTRY_NAME}" to components.json`);
  } else {
    console.log(`\nRegistry "${REGISTRY_NAME}" already in components.json`);
  }
}

switch (command) {
  case "init": {
    run("npx shadcn@latest init");
    addRegistryToComponentsJson();
    break;
  }
  case "add": {
    const components = args.slice(1);
    if (components.length === 0) {
      console.error("Usage: y2kui add <component> [component...]");
      process.exit(1);
    }
    run(`npx shadcn@latest add ${components.join(" ")} --registry ${REGISTRY_NAME}`);
    break;
  }
  default: {
    run(`npx shadcn@latest ${args.join(" ")}`);
    break;
  }
}
