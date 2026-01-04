---
title: Stephen Bochinski
---

<p class="lede">I like writing software and every once in a while like writing about it.</p>

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
