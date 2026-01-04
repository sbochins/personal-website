---
title: Home
---

<p class="lede">Welcome. I'm Stephen Bochinski, a software engineer focused on building reliable, human-centered systems. This site is a simple home for essays, notes, and occasional updates.</p>

If you're here for writing, start with the blog. If you'd like to know more about my background, the about page has a short overview.

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
