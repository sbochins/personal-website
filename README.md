# Stephen Bochinski

Minimalist editorial personal site built with Jekyll and hosted on GitHub Pages.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

If you are on Ruby 3.0.x, the Gemfile pins `github-pages`, `activesupport`, and `bigdecimal` to compatible versions.

## Publishing

Push commits to the `main` branch and GitHub Pages will build and deploy automatically.

## Custom domain

Once you have a domain, add a `CNAME` file at the repo root containing your domain name and set the domain in the GitHub Pages settings.
