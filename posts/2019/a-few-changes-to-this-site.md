---
layout: post.njk
title: A Few Changes to this Site
date: 2019-12-02
---

It has been a long while since my last post. Since then, I have made a couple changes to this site. Here in this short post, I outline those changes.

### Containerization

I'm not well-versed with Ruby or its surrounding technologies. Gems, Bundler --- I have only a surface knowledge of these topics. The static site generator I use for this website is Jekyll, which is written in Ruby. To make changes to my site or run it locally in development, I needed to to have Ruby set up along with the related Gems (packages). And because I worked on my site so infrequently, I often had packages getting deprecated or had cryptic error messages to chase down whenever I wanted to do some small piece of work on my site.

To improve this situation, I wrote a simple Dockerfile for my project. I learned just enough Docker to get started and then proceeded to look at sample implementations online. I referenced existing Dockerfiles and worked to understand what every line meant. In the end, I was able to come out with the Docker image I currently use, built on top of Alpine Linux and of course Ruby. I wrote it to run Jekyll on top of that base --- but specifically configured to work with GitHub Pages (which I use to host my site).

The docker image is here: [alidian/github-pages](https://hub.docker.com/r/alidian/github-pages). The Dockerfile used to generate it can be found in my [GitHub](https://github.com/octos4murai/octos4murai.github.io/blob/master/Dockerfile).

### Domain Change

Recently, I switched from my old domain [idian.al](http://idian.al) to the current [octos4murai.github.io](https://octos4murai.github.io). From the beginning, this site has always been hosted on GitHub through the GitHub Pages feature, where GitHub uses a static site generator to build a site from scratch each time. This approach has many benefits, some of which I discuss in my post [Jekyll: An Incomplete Overview](/posts/2016/jekyll-an-incomplete-overview).

I switched from an apex domain to a generic GitHub subdomain because I recognized that it mostly does not matter to people if I use a GitHub subdomain. This is probably particularly true for anyone who might be interested to read my blog posts --- probably developers themselves. Moreover, using a GitHub subdomain means I don't need to do my own setup to use SSL; this comes free in the subdomain option.

Perhaps the biggest downside to this domain change is that any references to my old domain on search engines are now broken. After some consideration, I have decided that this is just fine.