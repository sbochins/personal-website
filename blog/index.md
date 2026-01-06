---
title: Blog
permalink: /blog/
---

<p class="lede">Some random thoughts I'd like to share</p>

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
