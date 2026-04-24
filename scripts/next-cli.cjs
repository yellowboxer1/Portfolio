"use strict";

const [, , command, ...rest] = process.argv;

if (!command) {
  throw new Error("Missing Next.js command");
}

if (!process.env.NEXT_DIST_DIR) {
  process.env.NEXT_DIST_DIR = command === "dev" ? ".next-dev" : ".next-build";
}

process.argv = [process.argv[0], "next", command, ...rest];

require("next/dist/bin/next");
