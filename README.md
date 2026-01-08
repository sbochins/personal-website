# Stephen Bochinski

Minimalist editorial personal site built with Jekyll and hosted on GitHub Pages.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

If you are on Ruby 3.0.x, the Gemfile pins `github-pages`, `activesupport`, `bigdecimal`, and `http_parser.rb` to compatible versions.

## Publishing

Push commits to the `main` branch and GitHub Pages will build and deploy automatically.

## Custom domain

Once you have a domain, add a `CNAME` file at the repo root containing your domain name and set the domain in the GitHub Pages settings.

## Hacker News submission

Use the Playwright helper to submit a new post (headless by default). If you do not pass
`--title` and `--url`, it will submit the most recent post in `_posts/`.

```bash
npm install
npx playwright install --with-deps chromium
HN_USER="your_hn_username" HN_PASS="your_hn_password" npm run hn:submit

HN_USER="your_hn_username" HN_PASS="your_hn_password" \
  npm run hn:submit -- --title "Post title" --url "https://example.com"

If you do not set `HN_PASS`, the script will prompt for it.
```

Pass `--headed` if you want to watch the browser run.
