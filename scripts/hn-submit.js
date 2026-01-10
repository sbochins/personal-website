#!/usr/bin/env node
"use strict";

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const argv = process.argv.slice(2);

const getArg = (name) => {
  const flag = `--${name}`;
  const idx = argv.indexOf(flag);
  if (idx === -1) return null;
  return argv[idx + 1] || null;
};

const hasFlag = (name) => argv.includes(`--${name}`);
const hasAnyFlag = () => argv.some((arg) => arg.startsWith("--"));

let titleArg = getArg("title");
let urlArg = getArg("url");
if (!hasAnyFlag() && argv.length) {
  titleArg = argv.join(" ");
}
const headed = hasFlag("headed");
const user = getArg("user") || process.env.HN_USER;
let pass = getArg("pass") || process.env.HN_PASS;

const readConfig = () => {
  const configPath = path.join(process.cwd(), "_config.yml");
  const raw = fs.readFileSync(configPath, "utf8");
  const getValue = (key) => {
    const match = raw.match(new RegExp(`^${key}:\\s*\"?([^\"\\n]+)\"?\\s*$`, "m"));
    return match ? match[1].trim() : "";
  };
  return {
    url: getValue("url"),
    baseurl: getValue("baseurl"),
    permalink: getValue("permalink")
  };
};

const parseFrontMatter = (content) => {
  const normalized = content.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\\s*\\n([\\s\\S]*?)\\n---\\s*\\n/);
  if (!match) return {};
  const block = match[1];
  const titleMatch = block.match(/^title:\\s*(.+)\\s*$/m);
  return {
    title: titleMatch ? titleMatch[1].replace(/^"|"$/g, "").trim() : ""
  };
};

const findLatestPost = () => {
  const postsDir = path.join(process.cwd(), "_posts");
  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md"))
    .filter((file) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(file));
  if (!files.length) {
    throw new Error("No dated posts found in _posts.");
  }
  const latest = files.sort().pop();
  return path.join(postsDir, latest);
};

const buildPostUrl = (postPath) => {
  const config = readConfig();
  const filename = path.basename(postPath).trim();
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/);
  if (!match) {
    throw new Error("Post filename must be YYYY-MM-DD-slug.md to build URL.");
  }
  const [, year, month, day, slug] = match;
  const baseurl = config.baseurl || "";
  const permalink = config.permalink || "/blog/:year/:month/:day/:title/";
  const relative = permalink
    .replace(":year", year)
    .replace(":month", month)
    .replace(":day", day)
    .replace(":title", slug);
  const root = config.url ? config.url.replace(/\/$/, "") : "";
  return `${root}${baseurl}${relative}`;
};

const resolvePostData = () => {
  const latestPath = findLatestPost();
  const contents = fs.readFileSync(latestPath, "utf8");
  const frontMatter = parseFrontMatter(contents);
  const defaultTitle = frontMatter.title;
  const defaultUrl = buildPostUrl(latestPath);
  const title = titleArg || defaultTitle;
  const url = urlArg || defaultUrl;
  if (!title) {
    throw new Error("Latest post is missing a title in front matter.");
  }
  return { title, url };
};

const promptPassword = () =>
  new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });
    rl.question("HN password: ", (answer) => {
      rl.close();
      resolve(answer);
    });
    rl._writeToOutput = () => {};
  });

const ensureLoggedIn = async (page) => {
  const loginField = await page.$('input[name="acct"]');
  if (!loginField) return;
  if (!user) {
    throw new Error("HN username is required. Set HN_USER or pass --user.");
  }
  if (!pass) {
    pass = await promptPassword();
  }
  if (!pass) {
    throw new Error("HN password is required.");
  }
  await page.fill('input[name="acct"]', user);
  await page.fill('input[name="pw"]', pass);
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click('input[type="submit"]')
  ]);
};

const run = async () => {
  const browser = await chromium.launch({ headless: !headed });
  const context = await browser.newContext();
  const page = await context.newPage();

  const { title, url } = resolvePostData();

  await page.goto("https://news.ycombinator.com/submit", {
    waitUntil: "domcontentloaded"
  });

  await ensureLoggedIn(page);

  await page.goto("https://news.ycombinator.com/submit", {
    waitUntil: "domcontentloaded"
  });

  await page.fill('input[name="title"]', title);
  await page.fill('input[name="url"]', url);

  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    page.click('input[type="submit"]')
  ]);

  console.log(`Submitted. Review at: ${page.url()}`);
  console.log(`Title: ${title}`);
  console.log(`URL: ${url}`);
  await browser.close();
};

run().catch((err) => {
  console.error(err.message || err);
  console.error("Usage: node scripts/hn-submit.js [--title \"...\"] [--url \"...\"] [--headed]");
  console.error("Defaults to the latest post when title or url are omitted.");
  process.exit(1);
});
