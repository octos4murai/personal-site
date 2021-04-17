---
layout: post.njk
title: Changes to this Site for 2021
date: 2020-12-30
---

Over the last four and a half years, this blog has been invaluable to me as a tool to encourage and reinforce my intellectual curiosity and learning processes. Not only do I continue to enjoy writing content for this site, it has also served as a testbed for experimentation and creativity.

Looking forward to 2021, I have made several changes, large and small. In this post (taking inspiration from a similar [post](/posts/2019/changes-to-this-site-for-2020/) from last year), I highlight a few interesting changes.

### Eleventy migration

The largest change to this site going into 2021 is the migration from Jekyll to Eleventy. Both are excellent static site generators with active development and user communities. While Jekyll remains the most popular, many similar tools have gained traction over the past few years.

Both Jekyll and Eleventy have excellent documentation and are not difficult to dive into. What drew me to to Eleventy is that is written in Node. Since I am comfortable with Node and JavaScript, it is easier to write customizations or to simply understand what is under the hood. Jekyll on the other hand is written in Ruby, which I am unfamiliar with. Consequently, managing plugins and libraries are easier for me to do in NPM compared to Ruby's Bundler and RubyGems.

The migration itself involved recreating my page layouts and customizations in Eleventy. This was a relatively easy process, thanks to a good collection of community-contributed examples. Eleventy does not enjoy the same simplified build integration with GitHub as Jekyll --- so I had to figure out how I can continue to leverage GitHub's infrastructure to build and host my site with minimal work.

Today, this site is developed and built on my local machine using Eleventy. The statically-generated site is hosted, along with the source code, on GitHub Pages with an MIT License. GitHub no longer builds the site for me automatically, although I am certain this is possible with a little additional work. The website is then routed through a new custom domain, which I describe in the next section.

### Domain change

This blog has gone through several domain changes throughout its near five-year existence. It started under the domain *idian.al* available only through HTTP (no SSL certificate). Eventually, I decided to stop renting that domain and served the site under my GitHub account's default GitHub pages subdomain *octos4murai.github.io*. I was able to piggy-back off GitHub's SSL certificate and make my site available through HTTPS.

Going into 2021, I decided to change the domain once again --- this time to *idian.io*. I even secured an SSL certificate of my own rather than merely leveraging GitHub's. While I have no desire to make this site well-known by any means, I hope to keep the domain the same for a long time so as not to break old links I might provide to the content of my blog.

### Design tweaks

Since I was migrating my site, I took it as an opportunity to reconsider aspects of my website's design. The new design is still intentionally minimalist with a notable monospace font since these were features I am very keen on. I did however modify the site header and the titles of posts and sections. I also tweaked the way tables and other figures are displayed. Last but not least, I display code snippets using a different syntax highlighting engine; this time it has a nice dark theme with support for line highlighting.