---
layout: post.njk
title: Setting Up a Home Server
date: 2021-03-07
---

### Background

Recently, I purchased a [NUC barebones kit](https://www.intel.com/content/www/us/en/products/boards-kits/nuc/kits.html), which I customized with some memory and storage. Assembling the adorable, little computer was easy and quite fun --- and so was selecting and installing a Linux distro. It is strange to think this is actually the first desktop computer I have personally owned.

I wanted to use the computer as a moderately-powerful Linux development machine, and while I am experienced at working with Linux through remote connections and containers, I have never used Linux on my primary machine before.

Aside from serving as my primary computer, I wanted the NUC to function as a remote development machine --- something I can `ssh` into from my MacBook when I am away from home. In this blog post, I wanted to write about how I was able to successfully set up the NUC as a home server for development and general computing.

### Requirements

Here is what I wanted to achieve:

1. Have the ability to work on the NUC remotely through `ssh`, and
2. Do the above while on a residential internet connection with a dynamic IP address.

### Creating the SSH Server

The first step is simple to achieve. On my machine using [Pop!_OS](https://pop.system76.com/), I ran:

```bash
sudo apt install openssh-server
```

Since Pop!_OS is based on Ubuntu/Debian, the same command will work for Ubuntu, Debian, and other distros in the same family.

Even before any configuration, installing `openssh-server` is enough to support incoming `ssh` connections within the local network. So at this point, I am able to connect locally to my NUC from my MacBook through the NUC's local IP address.

### Working Around a Dynamic IP Address

The second step is a lot more involved than the first. There are a couple distinct challenges here:

1. Since my residential internet connection has a dynamic IP address, I can't rely on my home's public IP address to remain consistent over any period of time. I would like a solution that automatically handles this whenever it happens.
2. When I try to initiate an `ssh` connection from an outside device to my home network, my router needs to know to relay the information to my NUC.

To solve the first challenge and after a bit of research, I did the following:

- Signed up for a free Dynamic DNS service (i.e. [No-IP](https://www.noip.com/)). This service provides me a subdomain under one of their many domains (e.g. foobar.noip.com). It then maps my home network's current public IP address to that subdomain. As a result, whenever I want to initiate a connection with my home network from an outside device, I don't have to know the IP. I can just connect to the assigned subdomain `foobar.noip.com`; this subdomain is effectively an alias for my home network's IP address.
- Set up [Dynamic DNS](https://support.google.com/domains/answer/6147083?hl=en) on my router. When the home network's IP inevitably changes, a job is invoked to give No-IP the updated value. The IP mapped to the subdomain `foobar.noip.com` is changed to reflect this.

Then to deal with the second challenge, I did the following:

- Configured my router to use Port Forwarding, allowing me to reserve a port for a specific local IP address. In effect, anything trying to connect to my home network through a predetermined port is connected to my home server through its local IP address.
- Since [Port Forwarding](https://en.wikipedia.org/wiki/Port_forwarding) uses the local IP to send data to my NUC, I need to make sure my device's local IP stays the same. To achieve this, I added an entry in my router's [DHCP Reservation](https://homenetworkadmin.com/dhcp-reservation/) list which permanently allocates an address to my NUC (using the MAC address).

By using a free third-party service and making configuration changes to my home router, I was able to guarantee a reliable way to connect to my home server through `ssh` from an outside device.

### Additional Security

Since I have opened up my home network to incoming traffic from the public Internet, it is crucial that I think about what security features I can put up to minimize my attack surface. Here is what I have done so far:

- Configured my router to block all incoming connections except for specific ports (and specific types of connections),
- Set up `ufw` on my home server to only accept incoming traffic that is `ssh`,

```bash
sudo ufw allow ssh
sudo ufw enable
```

- Since I will be exclusively using my MacBook to `ssh` to my NUC, I set up the two machines to authenticate using `ssh` tokens. This also means I can disallow password authentication (by editing `/etc/ssh/sshd_config`). To get `ssh` access to my home server, you need to be making the connection using my MacBook.
