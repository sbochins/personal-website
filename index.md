---
title: Stephen Bochinski
---

<p class="lede">Senior software engineer writing about scalable systems, developer platforms, and the craft of building software that lasts.</p>

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
