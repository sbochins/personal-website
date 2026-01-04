---
title: Home
---

<section class="home-hero">
  <div>
    <p class="lede"><strong>Stephen Bochinski</strong> builds dependable software systems and platforms. This is a clean, focused home for essays, notes, and project updates from decades in engineering.</p>
    <p>If you're here for writing, start with the blog. If you want background on my work, the about page has a short overview.</p>
    <div class="hero-actions">
      <a class="button" href="{{ "/blog/" | relative_url }}">Read the blog</a>
      <a class="button secondary" href="{{ "/about/" | relative_url }}">About me</a>
    </div>
  </div>
  <aside class="hero-card">
    <h3>Focus areas</h3>
    <ul class="hero-list">
      <li>Platform engineering</li>
      <li>Scalable services</li>
      <li>Developer experience</li>
      <li>Technical leadership</li>
    </ul>
  </aside>
</section>

<hr>

<h2>Latest posts</h2>

<ul class="post-list">
  {% for post in site.posts limit: 3 %}
  <li>
    <a href="{{ post.url | relative_url }}">
      <div class="post-title">{{ post.title }}</div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 140 }}</p>
    </a>
  </li>
  {% endfor %}
</ul>
