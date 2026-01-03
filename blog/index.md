---
title: Blog
permalink: /blog/
---

<p class="lede">Essays and short notes on the craft of software engineering, leadership, and the small decisions that compound over time.</p>

<ul class="post-list">
  {% for post in site.posts %}
  <li>
    <a href="{{ post.url | relative_url }}">
      <div class="post-title">{{ post.title }}</div>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
    </a>
  </li>
  {% endfor %}
</ul>
